import React, { useMemo } from "react";
import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    ReadOutlined,
    TeamOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedKey = useMemo(() => {
        const path = location.pathname;
        if (path.startsWith("/dashboard/news")) return "news";
        if (path.startsWith("/dashboard/teachers")) return "teachers";
        if (path.startsWith("/dashboard")) return "dashboard";
        return "dashboard";
    }, [location.pathname]);

    const handleLogout = () => {
        window.alert("Logout successful!");
        navigate("/login");
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            trigger={null}
            breakpoint="lg"
            collapsedWidth={0}
            width={220}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
                <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", padding: 16, color: "#fff" }}>
                    <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", opacity: 0.72 }}>Admin Interface</div>
                    <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>Sekolah Pak Sona</div>
                    <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>Mode mock-up statis</div>
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} style={{ background: "transparent", borderInlineEnd: 0 }}>
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="news" icon={<ReadOutlined />}>
                    <Link to="/dashboard/news">News</Link>
                </Menu.Item>
                <Menu.Item key="teachers" icon={<TeamOutlined />}>
                    <Link to="/dashboard/teachers">Teachers</Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
                </Menu>
            </div>
        </Sider>
    );
} 

export default Sidebar;
