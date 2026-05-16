import React, { useMemo, useState } from "react";
import { Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Table, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReadOutlined } from "@ant-design/icons";
import AdminLayout from "../components/AdminLayout.jsx";

const initialNews = [
    {
        id: 1,
        title: "Study Tour ke Bali",
        category: "Kegiatan",
        date: "12 Apr 2026",
        status: "Published",
        excerpt: "Siswa kelas XI Melakukan Study Tour ke Bali untuk memperluas wawasan budaya dan sejarah Indonesia.",
    },
    {
        id: 2,
        title: "Upacara Bendera Hari Senin",
        category: "Kesiswaan",
        date: "08 Apr 2024",
        status: "Draft",
        excerpt: "Agenda rutin untuk membangun kedisiplinan dan rasa tanggung jawab siswa.",
    },
    {
        id: 3,
        title: "Sekolah Libur 2 Minggu Akibat Covid-19",
        category: "Pengumuman",
        date: "05 Apr 2024",
        status: "Archived",
        excerpt: "Sekolah akan libur selama 2 minggu akibat pandemi Covid-19.",
    },
];

const categoryOptions = ["Kegiatan", "Kesiswaan", "Akademik", "Prestasi", "Pengumuman"];
const statusOptions = ["Published", "Draft", "Archived"];

const statusColors = {
    Published: "green",
    Draft: "gold",
    Archived: "default",
};

function News() {
    const [newsItems, setNewsItems] = useState(initialNews);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    const summaryCards = useMemo(() => ([
        { label: "Total berita", value: newsItems.length, description: "Data statis yang bisa ditambah atau dihapus" },
        { label: "Berita terbit", value: newsItems.filter((item) => item.status === "Published").length, description: "Tampil sebagai publikasi aktif" },
        { label: "Berita draft", value: newsItems.filter((item) => item.status === "Draft").length, description: "Siap diedit sebelum dipublikasikan" },
    ]), [newsItems]);

    const openCreateModal = () => {
        setEditingItem(null);
        form.resetFields();
        form.setFieldsValue({ status: "Draft", category: categoryOptions[0], date: "10 Apr 2024" });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setNewsItems((current) => current.filter((item) => item.id !== id));
    };

    const handleSubmit = (values) => {
        if (editingItem) {
            setNewsItems((current) => current.map((item) => (item.id === editingItem.id ? { ...item, ...values } : item)));
        } else {
            setNewsItems((current) => [
                {
                    id: Date.now(),
                    ...values,
                },
                ...current,
            ]);
        }

        setIsModalOpen(false);
        setEditingItem(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Judul berita",
            dataIndex: "title",
            render: (_, record) => (
                <Space align="start" size={14}>
                    <div style={{ width: 54, height: 54, borderRadius: 18, background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", display: "grid", placeItems: "center", color: "#0f58a8", flexShrink: 0 }}>
                        <ReadOutlined />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, color: "#102a43" }}>{record.title}</div>
                        <div style={{ marginTop: 4, color: "#627d98", fontSize: 13, maxWidth: 420 }}>{record.excerpt}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Kategori",
            dataIndex: "category",
            render: (value) => <Tag color="blue" style={{ borderRadius: 999, padding: "2px 10px" }}>{value}</Tag>,
        },
        {
            title: "Tanggal",
            dataIndex: "date",
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
                    <Popconfirm title="Hapus berita ini?" description="Tindakan ini hanya menghapus data dari mock-up." onConfirm={() => handleDelete(record.id)} okText="Hapus" cancelText="Batal">
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
                        rowKey="id"
                        columns={columns}
                        dataSource={newsItems}
                        pagination={false}
                        size="middle"
                    />
                </Card>
            </div>

            <Modal
                title={editingItem ? "Edit berita" : "Tambah berita"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText={editingItem ? "Simpan perubahan" : "Simpan berita"}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="title" label="Judul" rules={[{ required: true, message: "Judul berita wajib diisi." }]}>
                        <Input placeholder="Masukkan judul berita" />
                    </Form.Item>
                    <Form.Item name="category" label="Kategori" rules={[{ required: true, message: "Kategori wajib dipilih." }]}>
                        <Select options={categoryOptions.map((item) => ({ value: item, label: item }))} />
                    </Form.Item>
                    <Form.Item name="date" label="Tanggal tampil" rules={[{ required: true, message: "Tanggal wajib diisi." }]}>
                        <Input placeholder="Contoh: 10 Apr 2024" />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status wajib dipilih." }]}>
                        <Select options={statusOptions.map((item) => ({ value: item, label: item }))} />
                    </Form.Item>
                    <Form.Item name="excerpt" label="Ringkasan" rules={[{ required: true, message: "Ringkasan berita wajib diisi." }]}>
                        <Input.TextArea rows={4} placeholder="Masukkan ringkasan berita" />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default News;