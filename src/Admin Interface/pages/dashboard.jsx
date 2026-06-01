import React, { useEffect, useState } from "react";
import { Button, Card, Col, List, Row, Space, Statistic, Tag, Typography } from "antd";
import { ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../../api/index.js";

function Dashboard() {
    const [quickStats, setQuickStats] = useState([]);
    const [recentUpdates, setRecentUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        // Load all necessary data for the dashboard overview, including news, announcements, and user summary
        const loadDashboard = async () => {
            try {
                const [newsRes, announcementRes, userRes] = await Promise.all([
                    api.get("/berita"),
                    api.get("/pengumuman"),
                    api.get("/user"),
                ]);

                if (!mounted) return;

                const users = userRes.data;
                const guruCount = users.filter((user) => user.role === "Guru").length;
                const staffCount = users.filter((user) => user.role === "Staff").length;
                const totalUserCount = users.length;

                setQuickStats([
                    { title: "Berita", value: newsRes.data.length, suffix: "item", color: "#0f58a8" },
                    { title: "Guru terdata", value: guruCount, suffix: "orang", color: "#0f766e" },
                    { title: "Pengumuman", value: announcementRes.data.length, suffix: "item", color: "#7c3aed" },
                ]);

                const latestNews = newsRes.data.slice(0, 3).map((item) => ({
                    time: new Date(item.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
                    title: item.title,
                    detail: item.summary,
                }));

                const latestAnnouncements = announcementRes.data.slice(0, 2).map((item) => ({
                    time: new Date(item.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
                    title: item.title,
                    detail: item.content,
                }));

                setRecentUpdates([
                    ...latestNews,
                    ...latestAnnouncements,
                    {
                        time: "-",
                        title: "Ringkasan user terdata",
                        detail: `Total user ${totalUserCount}, guru ${guruCount}, staff ${staffCount}`,
                    },
                ]);
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadDashboard();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <AdminLayout
            title="Selamat datang di dashboard admin"
        >
            <div style={{ display: "grid", gap: 24 }}>
                <Card
                    bordered={false}
                    style={{
                        borderRadius: 28,
                        background: "linear-gradient(135deg, #0f58a8 0%, #1d7fe0 100%)",
                        color: "#fff",
                        boxShadow: "0 20px 45px rgba(15, 88, 168, 0.18)",
                    }}
                    bodyStyle={{ padding: 28 }}
                >
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} lg={15}>
                            <Typography.Text style={{ color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
                                Overview singkat
                            </Typography.Text>
                            <Typography.Title level={2} style={{ margin: "10px 0 12px", color: "#fff", textTransform: "capitalize" }}>
                                Halaman dashboard admin
                            </Typography.Title>
                            <Typography.Paragraph style={{ margin: 0, color: "rgba(255,255,255,0.88)", fontSize: 16, maxWidth: 700 }}>
                                Gunakan dashboard ini sebagai pintu masuk untuk memantau ringkasan data, membuka halaman berita, dan mengelola daftar guru.
                            </Typography.Paragraph>
                        </Col>
                        <Col xs={24} lg={9}>
                            <div style={{ borderRadius: 24, background: "rgba(255,255,255,0.14)", padding: 20, backdropFilter: "blur(8px)" }}>
                                <Typography.Text style={{ color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>Aksi cepat</Typography.Text>
                                <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                                    <Link to="/dashboard/news">
                                        <Button block size="large" style={{ borderRadius: 14, height: 48 }} icon={<ArrowRightOutlined />}>
                                            Buka halaman berita
                                        </Button>
                                    </Link>
                                    <Link to="/dashboard/teachers">
                                        <Button block size="large" style={{ borderRadius: 14, height: 48 }} icon={<ArrowRightOutlined />}>
                                            Buka halaman guru
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {loading ? (
                    <Card bordered={false} style={{ borderRadius: 24, boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}>
                        Memuat data dashboard...
                    </Card>
                ) : null}

                <Row gutter={[20, 20]}>
                    {quickStats.map((item) => (
                        <Col key={item.title} xs={24} md={8}>
                            <Card bordered={false} style={{ borderRadius: 24, boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}>
                                <Statistic title={item.title} value={item.value} suffix={item.suffix} valueStyle={{ color: item.color, fontSize: 34, fontWeight: 800 }} />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row>
                    <Col flex={"auto"}>
                        <Card
                            bordered={false}
                            style={{ borderRadius: 24, boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)" }}
                            title="Aktivitas terbaru"
                            extra={<Tag color="blue">Live preview</Tag>}
                        >
                            <List
                                dataSource={recentUpdates}
                                renderItem={(item) => (
                                    <List.Item style={{ paddingInline: 0 }}>
                                        <List.Item.Meta
                                            avatar={
                                                <div style={{ width: 52, height: 52, borderRadius: 18, background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", display: "grid", placeItems: "center", color: "#0f58a8" }}>
                                                    <CalendarOutlined />
                                                </div>
                                            }
                                            title={<span style={{ color: "#102a43", fontWeight: 700 }}>{item.title}</span>}
                                            description={<span style={{ color: "#627d98" }}>{item.detail}</span>}
                                        />
                                        <Tag color="geekblue">{item.time}</Tag>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;