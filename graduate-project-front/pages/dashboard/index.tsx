
import { GetServerSidePropsContext, NextPage } from "next";
import { checkAuth } from "../../utils/checkAuth"
import { Header } from "../../component/Header";
import React from "react";
import { FileOutlined, FileImageOutlined, DeleteOutlined } from "@ant-design/icons";
import { Layout } from "../../layout/Layout";
import styles from "../../styles/Home.module.scss"
import { Button, Menu } from "antd";
import { useRouter } from "next/router";
import { UploadBtn } from "../../component/UploadButton";
import * as Api from "../../api";
import { FileItem } from "../../api/dto/files.dto";
import { FileList } from "../../component/FileList";
import { HomeLayout } from "../../layout/HomeLayout";
import { Actions } from "../../component/Actions";
import { Files } from "../../modules/Files";


interface Props {
    items: FileItem[];
}


const PDashboard: NextPage<Props> = ({ items }) => {

    const router = useRouter();
    const selectMenu = router.pathname;

    return (
        <HomeLayout>
            <Files items={items} withActions/>
        </HomeLayout>
    )
}

PDashboard.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard">{page}</Layout>;
};



export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ("redirect" in authProps) {
        return authProps;
    }
    try {
        const items = await Api.files.getAll();

        return {
            props: {
                items,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {},
        }
    }
}

export default PDashboard;