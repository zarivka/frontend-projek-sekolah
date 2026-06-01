import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table, Tag, Typography } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../../api/index.js";

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const roleOptions = ["Guru", "Staff", "Admin", "Murid"];

    const loadTeachers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/user");
            setTeachers(res.data.filter((item) => item.role === "Guru" || item.role === "Staff"));
        } catch (err) {
            console.error("Failed to load teachers:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    const summaryCards = useMemo(() => ([
        { label: "Total guru & staf", value: teachers.length, description: "Data dari backend" },
        { label: "Guru", value: teachers.filter((item) => item.role === "Guru").length, description: "Akun berperan guru" },
        { label: "Staff", value: teachers.filter((item) => item.role === "Staff").length, description: "Akun berperan staff" },
    ]), [teachers]);

    const openCreateModal = () => {
        setEditingTeacher(null);
        form.resetFields();
        form.setFieldsValue({ role: roleOptions[0] });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingTeacher(item);
        form.setFieldsValue(item);
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            if (editingTeacher) {
                await api.put(`/user/${editingTeacher._id}`, values);
            } else {
                await api.post("/user", values);
            }

            await loadTeachers();
            setIsModalOpen(false);
            setEditingTeacher(null);
            form.resetFields();
        } catch (err) {
            console.error("Failed to save teacher:", err);
        }
    };

    const columns = [
        {
            title: "Nama",
            dataIndex: "name",
            render: (_, record) => (
                <Space align="start" size={14}>
                    <Avatar size={52} style={{ background: "linear-gradient(135deg, #0f58a8 0%, #1d7fe0 100%)" }}>
                        {(record.name || "-")
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                    </Avatar>
                    <div>
                        <div style={{ fontWeight: 700, color: "#102a43" }}>{record.name}</div>
                        <div style={{ marginTop: 4, color: "#627d98", fontSize: 13 }}>{record.nim_nls}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (value) => <Tag color="blue" style={{ borderRadius: 999, padding: "2px 10px" }}>{value}</Tag>,
        },
        {
            title: "Aksi",
            render: (_, record) => (
                <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout title="Manajemen guru & staf" extra={<Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>Tambah Guru / Staf</Button>}>
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
                    <Table rowKey="_id" columns={columns} dataSource={teachers} pagination={false} size="middle" loading={loading} />
                </Card>
            </div>

            <Modal title={editingTeacher ? "Edit Guru / Staf" : "Tambah Guru / Staf"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()} destroyOnClose>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Nama guru wajib diisi." }]}>
                        <Input placeholder="Masukkan nama guru" />
                    </Form.Item>
                    <Form.Item name="nim_nls" label="NIM/NLS" rules={[{ required: true, message: "NIM/NLS wajib diisi." }]}>
                        <Input placeholder="Masukkan NIM/NLS" />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role wajib dipilih." }]}>
                        <Select options={roleOptions.map((item) => ({ value: item, label: item }))} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={editingTeacher ? [] : [{ required: true, message: "Password wajib diisi." }]}>
                        <Input.Password placeholder="Masukkan password" />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default Teachers;
