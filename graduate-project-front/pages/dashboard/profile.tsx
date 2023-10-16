import { GetServerSidePropsContext, NextPage } from "next";
import { User } from "../../api/dto/auth.dto";
import { Button } from "antd";

import styles from "../../styles/ProfileForm.module.scss";
import { checkAuth } from "../../utils/checkAuth";
import * as Api from "../../api";
import React from "react";
import { Layout } from "../../layout/Layout";


interface Props {
    userData: User;
}

const ProfilePage: NextPage<Props> = ({ userData }) => {
    const onClickLogout = () => {
        if (window.confirm("Ви справді хочете вийти?")) {
            Api.auth.logout();
            location.href = "/";
        }
    }

    return (
        <main>
            <div className={styles.root}>
                <h1>Мій профіль</h1>
                <br />
                <p>
                    ID: <b>{userData.id}</b>
                </p>
                <p>
                    Iм'я користувача: <b>{userData.fullname}</b>
                </p>
                <p>
                    E-Mail: <b>{userData.email}</b>
                </p>
                <br />
                <Button onClick={onClickLogout} type="primary" danger>
                    Вийти
                </Button>
            </div>
        </main>
    )
}

ProfilePage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Профиль">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ("redirect" in authProps) {
        return authProps;
    }

    const userData = await Api.auth.getMe();

    return {
        props: {
            userData,
        },
    };
};

export default ProfilePage;