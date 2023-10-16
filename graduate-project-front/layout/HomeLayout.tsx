import React from "react";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { Menu } from "antd";
import {
    DeleteOutlined,
    FileImageOutlined,
    FileOutlined,
} from "@ant-design/icons";
import { UploadBtn } from "../component/UploadButton";

export const HomeLayout: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const router = useRouter();
    const selectMenu = router.pathname;

    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.sidebar}>
                <UploadBtn />
                <Menu
                    className={styles.menu}
                    mode="inline"
                    selectedKeys={[selectMenu]}
                    items={[
                        {
                            key: '/dashboard',
                            icon: <FileOutlined />,
                            label: 'Файли',
                            onClick: () => router.push('/dashboard')
                        },
                        {
                            key: '/dashboard/photo',
                            icon: <FileImageOutlined />,
                            label: 'Зображення',
                            onClick: () => router.push('/dashboard/photo')
                        },

                        {
                            key: '/dashboard/trash',
                            icon: <DeleteOutlined />,
                            label: 'Сміття',
                            onClick: () => router.push('/dashboard/trash')
                        },
                    ]}
                />
            </div>
            <div className='container'>
                {children}
            </div>
        </main>
    );
};