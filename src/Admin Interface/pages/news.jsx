import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Space, Table, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReadOutlined } from "@ant-design/icons";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../../api/index.js";

function News() {
    const [newsItems, setNewsItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [form] = Form.useForm();

    const summaryCards = useMemo(() => ([
        { label: "Total berita", value: newsItems.length, description: "Data yang tersimpan di backend" },
        { label: "Terbaru", value: newsItems[0] ? 1 : 0, description: "Berita paling atas di daftar" },
        { label: "Dengan gambar", value: newsItems.filter((item) => item.imageUrl).length, description: "Berita yang punya gambar" },
    ]), [newsItems]);

    // Load news items from backend
    const loadNews = async () => {
        try {
            setLoading(true);
            const res = await api.get("/berita");
            setNewsItems(res.data);
        } catch (err) {
            console.error("Failed to load news:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const openCreateModal = () => {
        setEditingItem(null);
        form.resetFields();
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/berita/${id}`);
            await loadNews();
        } catch (err) {
            console.error("Failed to delete news:", err);
        }
    };

    const handleSubmit = async (values) => {
        if (submitting || uploadingThumbnail) return;

        try {
            setSubmitting(true);
            let imageUrl = values.imageUrl || editingItem?.imageUrl || "";

            if (selectedFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("image", selectedFile);

                setUploadingThumbnail(true);
                const uploadResponse = await api.post("/image/upload", uploadFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imageUrl = uploadResponse.data?.url || imageUrl;
            }

            const payload = {
                ...values,
                imageUrl,
            };

            if (editingItem) {
                await api.put(`/berita/${editingItem._id}`, payload);
            } else {
                await api.post("/berita", payload);
            }

            await loadNews();
            setIsModalOpen(false);
            setEditingItem(null);
            setSelectedFile(null);
            form.resetFields();
        } catch (err) {
            console.error("Failed to save news:", err);
        } finally {
            setSubmitting(false);
            setUploadingThumbnail(false);
        }
    };

    const columns = [
        {
            title: "Judul berita",
            dataIndex: "title",
            render: (_, record) => (
                <Space align="start" size={14}>
                    <div style={{ width: 54, height: 54, borderRadius: 18, background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", display: "grid", placeItems: "center", color: "#0f58a8", flexShrink: 0, overflow: "hidden" }}>
                        {record.imageUrl ? <img src={record.imageUrl} alt={record.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <ReadOutlined />}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, color: "#102a43" }}>{record.title}</div>
                        <div style={{ marginTop: 4, color: "#627d98", fontSize: 13, maxWidth: 420 }}>{record.summary}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Tanggal",
            dataIndex: "createdAt",
            render: (value) => new Date(value).toLocaleDateString("id-ID"),
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
                    <Popconfirm title="Hapus berita ini?" description="Tindakan ini akan menghapus data dari backend." onConfirm={() => handleDelete(record._id)} okText="Hapus" cancelText="Batal">
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
            title="Manajemen berita"
            extra={<Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>Tambah Berita</Button>}
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
                        dataSource={newsItems}
                        pagination={false}
                        size="middle"
                        loading={loading}
                    />
                </Card>
            </div>

            <Modal
                title={editingItem ? "Edit berita" : "Tambah berita"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText={editingItem ? "Simpan perubahan" : "Simpan berita"}
                confirmLoading={submitting || uploadingThumbnail}
                okButtonProps={{ disabled: submitting || uploadingThumbnail }}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="title" label="Judul" rules={[{ required: true, message: "Judul berita wajib diisi." }]}>
                        <Input placeholder="Masukkan judul berita" />
                    </Form.Item>
                    <Form.Item name="summary" label="Ringkasan" rules={[{ required: true, message: "Ringkasan berita wajib diisi." }]}>
                        <Input.TextArea rows={3} placeholder="Masukkan ringkasan berita" />
                    </Form.Item>
                    <Form.Item name="content" label="Isi berita" rules={[{ required: true, message: "Isi berita wajib diisi." }]}>
                        <Input.TextArea rows={6} placeholder="Masukkan isi berita" />
                    </Form.Item>
                    <Form.Item name="imageUrl" label="URL gambar">
                        <Input placeholder="https://..." />
                    </Form.Item>
                    <Form.Item label="Thumbnail file">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default News;