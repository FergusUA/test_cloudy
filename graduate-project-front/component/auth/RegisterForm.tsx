import React from "react";
import styles from './RegisterForm.module.scss'
import { Button, Form, Input, notification } from "antd";
import { RegisterFormDTO } from "../../api/dto/auth.dto";
import { setCookie } from "nookies";
import * as Api from "../../api";

export const RegisterForm: React.FC = () => {

    const onSubmit = async (values: RegisterFormDTO) => {
        try {
            const { token } = await Api.auth.register(values);

            notification.success({
                message: "Успешно!",
                description: "Переходим в админ-панель...",
                duration: 2,
            });

            setCookie(null, "_token", token, {
                path: "/",
            });

            location.href = "/dashboard";
        } catch (err) {
            console.warn(err);

            notification.error({
                message: "Помилка!",
                description: "Помилка під час реєстрації",
                duration: 2,
            });
        }
    };
    return (
        <div className={styles.root}>

            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Name"
                    name="fullname"
                    rules={[{ required: true, message: "Введіть своє ім'я" }]}
                >
                    <Input></Input>
                </Form.Item>

                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[{ required: true, message: 'Введіть свiй e-mail' }]}
                >
                    <Input></Input>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введіть свiй пароль' }]}
                >
                    <Input.Password
                        type="password"
                        placeholder="Password"></Input.Password>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 1,
                        offset: 16,
                    }}>
                    <Button type="primary" htmlType="submit">
                        Зареєструватись
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )

}

