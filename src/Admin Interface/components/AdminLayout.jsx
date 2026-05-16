import React, { useState } from "react";
import { Layout, Space, Typography } from "antd";
import Sidebar from "../../components/sidebar.jsx";

const { Header, Content } = Layout;

const AdminLayout = ({ title, subtitle, extra, children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh", background: "linear-gradient(180deg, #eef4ff 0%, #f7faff 100%)" }}>
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
            <Layout style={{ minHeight: "100vh", background: "transparent" }}>
                <Header style={{ height: "auto", padding: "28px 24px 16px", background: "transparent", lineHeight: 1.2 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
                        <div style={{ maxWidth: 840 }}>
                            <Typography.Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: "#5b7aa5" }}>
                                Admin Panel
                            </Typography.Text>
                            <Typography.Title level={2} style={{ margin: "8px 0 8px", color: "#102a43" }}>
                                {title}
                            </Typography.Title>
                            <Typography.Paragraph style={{ margin: 0, color: "#486581", fontSize: 16, maxWidth: 760 }}>
                                {subtitle}
                            </Typography.Paragraph>
                        </div>
                        {extra ? <Space wrap>{extra}</Space> : null}
                    </div>
                </Header>
                <Content style={{ padding: "0 24px 28px" }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;