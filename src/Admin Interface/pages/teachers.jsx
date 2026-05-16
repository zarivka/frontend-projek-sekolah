import React, { useMemo, useState } from "react";
import { Avatar, Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Table, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import AdminLayout from "../components/AdminLayout.jsx";

const initialTeachers = [
    {
        id: 1,
        name: "Albasori, S.Pd",
        role: "Kepala Sekolah",
        subject: "Manajemen Sekolah",
        status: "Active",
        phone: "+62 812 3456 7890",
    },
    {
        id: 2,
        name: "Ina Yustita, S.Pd",
        role: "Guru",
        subject: "Matematika",
        status: "Active",
        phone: "+62 813 4444 2233",
    },
    {
        id: 3,
        name: "Bambang Hadi Waksono, S.Kom",
        role: "Guru",
        subject: "Informatika",
        status: "Inactive",
        phone: "+62 811 2020 2020",
    },
    {
        id: 4,
        name: "Kobo Kanaeru, S.Pd",
        role: "Karyawan",
        subject: "Administrasi",
        status: "Active",
        phone: "+62 817 5555 1122",
    },
];

const roleOptions = ["Kepala Sekolah", "Guru", "Karyawan", "Wakil Kepala Sekolah"];
const statusOptions = ["Active", "Inactive"];

const statusColors = {
    Active: "green",
    Inactive: "default",
};

function Teachers() {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [form] = Form.useForm();

    const summaryCards = useMemo(() => ([
        { label: "Total guru & staf", value: teachers.length, description: "Daftar guru yang ada di web sekolah" },
        { label: "Status aktif", value: teachers.filter((item) => item.status === "Active").length, description: "Data yang guru yang ditampilkan" },
        { label: "Status nonaktif", value: teachers.filter((item) => item.status === "Inactive").length, description: "Data guru yang tidak ditampilkan" },
    ]), [teachers]);

    const openCreateModal = () => {
        setEditingTeacher(null);
        form.resetFields();
        form.setFieldsValue({ role: roleOptions[1], status: statusOptions[0] });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingTeacher(item);
        form.setFieldsValue(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setTeachers((current) => current.filter((item) => item.id !== id));
    };

    const handleSubmit = (values) => {
        if (editingTeacher) {
            setTeachers((current) => current.map((item) => (item.id === editingTeacher.id ? { ...item, ...values } : item)));
        } else {
            setTeachers((current) => [
                {
                    id: Date.now(),
                    ...values,
                },
                ...current,
            ]);
        }

        setIsModalOpen(false);
        setEditingTeacher(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Nama",
            dataIndex: "name",
            render: (_, record) => (
                <Space align="start" size={14}>
                    <Avatar size={52} style={{ background: "linear-gradient(135deg, #0f58a8 0%, #1d7fe0 100%)" }}>
                        {record.name
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                    </Avatar>
                    <div>
                        <div style={{ fontWeight: 700, color: "#102a43" }}>{record.name}</div>
                        <div style={{ marginTop: 4, color: "#627d98", fontSize: 13 }}>{record.phone}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Peran",
            dataIndex: "role",
            render: (value) => <Tag color="blue" style={{ borderRadius: 999, padding: "2px 10px" }}>{value}</Tag>,
        },
        {
            title: "Bidang",
            dataIndex: "subject",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (value) => <Tag color={statusColors[value]} style={{ borderRadius: 999, padding: "2px 10px" }}>{value}</Tag>,
        },
        {
            title: "Aksi",
            render: (_, record) => (
                <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
                        Edit
                    </Button>
                    <Popconfirm title="Hapus guru ini?" description="Perubahan hanya terjadi di state lokal." onConfirm={() => handleDelete(record.id)} okText="Hapus" cancelText="Batal">
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
            title="Manajemen guru"
            extra={<Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>Tambah Guru</Button>}
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
                        rowKey="id"
                        columns={columns}
                        dataSource={teachers}
                        pagination={false}
                        size="middle"
                    />
                </Card>
            </div>

            <Modal
                title={editingTeacher ? "Edit guru" : "Tambah guru"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText={editingTeacher ? "Simpan perubahan" : "Simpan guru"}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Nama guru wajib diisi." }]}>
                        <Input placeholder="Masukkan nama guru" />
                    </Form.Item>
                    <Form.Item name="role" label="Peran" rules={[{ required: true, message: "Peran wajib dipilih." }]}>
                        <Select options={roleOptions.map((item) => ({ value: item, label: item }))} />
                    </Form.Item>
                    <Form.Item name="subject" label="Bidang / Mapel" rules={[{ required: true, message: "Bidang wajib diisi." }]}>
                        <Input placeholder="Contoh: Matematika" />
                    </Form.Item>
                    <Form.Item name="phone" label="Kontak" rules={[{ required: true, message: "Kontak wajib diisi." }]}>
                        <Input placeholder="Contoh: +62 812 3456 7890" />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status wajib dipilih." }]}>
                        <Select options={statusOptions.map((item) => ({ value: item, label: item }))} />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default Teachers;