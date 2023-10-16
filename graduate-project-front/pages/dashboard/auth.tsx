import { NextPage } from "next";
import Head from "next/head";
import { LoginForm } from "../../component/auth/LoginForm";
import { Tabs } from "antd";
import { RegisterForm } from "../../component/auth/RegisterForm";

const AuthPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Auth</title>
            </Head>
            <main style={{ width: 400, margin: '50px auto' }}>
                <Tabs
                    items={[
                        {
                            label: 'Увійти',
                            key: '1',
                            children: <LoginForm />
                        },
                        {
                            label: 'Реєстрація',
                            key: '2',
                            children: <RegisterForm />
                        }
                    ]}
                />
            </main>
        </>
    )
}
export default AuthPage;