import { Avatar, Button, Layout, Menu, Popover } from "antd"
import React from "react"
import styles from "./Header.module.scss"
import { GlobalOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import * as Api from "../../api"

export const Header: React.FC = () => {

    const router = useRouter();
    const selectMenu = router.pathname;
    const onClickLogout = () => {
        if (window.confirm("Ви справді хочете вийти?")) {
            Api.auth.logout();
            location.href = "/";
        }
    };

    return (
        <Layout.Header className={styles.root}>
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <h2>
                        <GlobalOutlined />
                        eLearnSky
                    </h2>

                    <Menu
                        className={styles.topMenu}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[selectMenu]}
                        onSelect={({ key }) => router.push(key)}
                        items={[
                            { key: "/dashboard", label: "Головна" },
                            { key: "/dashboard/profile", label: "Профіль" },
                        ]}></Menu>
                </div>
                <div className={styles.headerRight}>
                    <Popover trigger="click" content={
                        <Button onClick={onClickLogout} type="primary" danger>Вийти</Button>
                    }>
                        <Avatar>Y</Avatar>
                    </Popover>
                </div>
            </div>
        </Layout.Header>
    )
}