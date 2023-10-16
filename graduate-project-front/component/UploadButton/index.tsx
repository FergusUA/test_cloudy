import React from "react";
import styles from "../../styles/Home.module.scss"
import { Button, Upload, UploadFile, notification } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import * as Api from "../../api";


export const UploadBtn: React.FC = () => {

    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const onUploadSuccess = async (options) => {
        try {
            await Api.files.uploadFile(options);

            setFileList([]);

            window.location.reload()

            window.location.reload();
        } catch (err) {
            notification.error({
                message: "Помилка!",
                description: "Неможливо завантажити файл",
                duration: 2,
            });
        }
    };

    return (
        <Upload
            onChange={({ fileList }) => setFileList(fileList)}
            customRequest={onUploadSuccess}
            fileList={fileList}
            className={styles.upload}>

            <Button type="primary" icon={<CloudUploadOutlined />}>Завантажити файл</Button>

        </Upload>
    )
}