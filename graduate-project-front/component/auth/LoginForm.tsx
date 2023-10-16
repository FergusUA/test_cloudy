import React from "react";
import styles from './LoginForm.module.scss'
import { setCookie } from "nookies";
import { Button, Form, Input, notification } from "antd";
import { LoginFormDTO } from "../../api/dto/auth.dto";
import * as Api from "../../api";

export const LoginForm: React.FC = () => {
    const onSubmit = async (values: LoginFormDTO) => {
      try {
        const { token } = await Api.auth.login(values);
  
        notification.success({
          message: "Успішна авторизація",
          description: "Переходимо до адмін панелі",
          duration: 2,
        });
  
        setCookie(null, "_token", token, {
          path: "/",
        });
  
        location.href = "/dashboard";
      } catch (err) {
        console.warn("LoginForm", err);
  
        notification.error({
          message: "Помилка!",
          description: "Невірний логін або пароль",
          duration: 2,
        });
      }
    };

    return <div className={styles.formBlock}>
        <Form
            name="basic"
            labelCol={{
                span: 6,
            }}
            onFinish={onSubmit}>
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
                    offset: 20,
                }}>
                <Button type="primary" htmlType="submit">
                    Увійти
                </Button>
            </Form.Item>
        </Form>
    </div>
}