import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, NotificationOutlined } from "@ant-design/icons";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../../api/index.js";

function Announcements() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const summaryCards = useMemo(() => ([
        { label: "Total pengumuman", value: items.length, description: "Seluruh data yang tersimpan" },
        { label: "Pengumuman terbaru", value: items[0] ? 1 : 0, description: "Item paling atas di daftar" },
        { label: "Isi panjang", value: items.filter((item) => (item.content || "").length > 120).length, description: "Pengumuman dengan detail lebih banyak" },
    ]), [items]);

    const loadAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await api.get("/pengumuman");
            setItems(res.data);
        } catch (err) {
            console.error("Failed to load announcements:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const openCreateModal = () => {
        setEditingItem(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/pengumuman/${id}`);
            await loadAnnouncements();
        } catch (err) {
            console.error("Failed to delete announcement:", err);
        }
    };

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);

            if (editingItem) {
                await api.put(`/pengumuman/${editingItem._id}`, values);
            } else {
                await api.post("/pengumuman", values);
            }

            await loadAnnouncements();
            setIsModalOpen(false);
            setEditingItem(null);
            form.resetFields();
        } catch (err) {
            console.error("Failed to save announcement:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const columns = [
        {
            title: "Judul pengumuman",
            dataIndex: "title",
            render: (_, record) => (
                <Space align="start" size={14}>
                    <div style={{ width: 54, height: 54, borderRadius: 18, background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)", display: "grid", placeItems: "center", color: "#6d28d9", flexShrink: 0 }}>
                        <NotificationOutlined />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, color: "#102a43" }}>{record.title}</div>
                        <div style={{ marginTop: 4, color: "#627d98", fontSize: 13, maxWidth: 520 }}>
                            {(record.content || "").length > 160 ? `${record.content.slice(0, 160)}...` : record.content}
                        </div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Tanggal",
            dataIndex: "createdAt",
            render: (value) => (value ? new Date(value).toLocaleDateString("id-ID") : "-"),
        },
        {
            title: "Pembuat",
            dataIndex: "createdBy",
            render: (value) => value || "-",
        },
        {
            title: "Aksi",
            render: (_, record) => (
                <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
                        Edit
                    </Button>
                    <Popconfirm title="Hapus pengumuman ini?" description="Tindakan ini akan menghapus data dari backend." onConfirm={() => handleDelete(record._id)} okText="Hapus" cancelText="Batal">
                        <Button size="small" danger icon={<DeleteOutlined />}>
                            Hapus
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout
            title="Manajemen pengumuman"
            subtitle="Buat, edit, dan hapus pengumuman yang akan tampil di halaman publik."
            extra={<Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>Tambah Pengumuman</Button>}
        >
            <div style={{ display: "grid", gap: 20 }}>
                <Row gutter={[20, 20]}>
                    {summaryCards.map((item) => (
                        <Col key={item.label} xs={24} md={8}>
                            <Card bordered={false} style={{ borderRadius: 24, boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}>
                                <Typography.Text style={{ color: "#627d98", fontWeight: 600 }}>{item.label}</Typography.Text>
                                <Typography.Title level={2} style={{ margin: "8px 0 6px", color: "#102a43" }}>{item.value}</Typography.Title>
                                <Typography.Paragraph style={{ margin: 0, color: "#627d98" }}>{item.description}</Typography.Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Card bordered={false} style={{ borderRadius: 24, boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}>
                    <Table
                        rowKey="_id"
                        columns={columns}
                        dataSource={items}
                        pagination={false}
                        size="middle"
                        loading={loading}
                    />
                </Card>
            </div>

            <Modal
                title={editingItem ? "Edit pengumuman" : "Tambah pengumuman"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText={editingItem ? "Simpan perubahan" : "Simpan pengumuman"}
                confirmLoading={submitting}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="title" label="Judul" rules={[{ required: true, message: "Judul pengumuman wajib diisi." }]}>
                        <Input placeholder="Masukkan judul pengumuman" />
                    </Form.Item>
                    <Form.Item name="content" label="Isi pengumuman" rules={[{ required: true, message: "Isi pengumuman wajib diisi." }]}>
                        <Input.TextArea rows={7} placeholder="Masukkan isi pengumuman" />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default Announcements;