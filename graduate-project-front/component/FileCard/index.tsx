import React from "react";
import styles from "./FileCard.module.scss";
import { getExtension } from "../../utils/getExtension";
import { isImage } from "../../utils/isImage";
import { getColByExt } from "../../utils/getColByExt";
import { FileTextOutlined } from "@ant-design/icons";

interface FileCardProps {
    filename: string;
    originalname: string;
}

export const FileCard: React.FC<FileCardProps> = ({
    originalname,
    filename,
}) => {
    const ext = getExtension(filename);
    const imageUrl =
        ext && isImage(ext) ? "http://localhost:7777/uploads/" + filename : "";

    const color = getColByExt(ext);
    const classColor = styles[color];

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <i className={classColor}>{ext}</i>
                {isImage(ext) ? (
                    <img className={styles.image} src={imageUrl} alt="File" />
                ) : (
                    <FileTextOutlined />
                )}
            </div>
            <span>{originalname}</span>
        </div>
    );
};