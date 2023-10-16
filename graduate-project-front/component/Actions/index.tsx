import React from "react";
import styles from "./Actions.module.scss";
import { Button, Popconfirm } from "antd";

interface FileActionsProps {
  onClickRemove: VoidFunction;
  onClickShare: VoidFunction;
  isActive: boolean;
}

export const Actions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
}) => {

  return (
    <div className={styles.root}>
      <Button onClick={onClickShare} disabled={!isActive}>
        Завантажити
      </Button>

      <Popconfirm
        title="Удалить файл(ы)?"
        description="Все файлы будут перемещены в корзину"
        okText="Да"
        cancelText="Нет"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Видалити
        </Button>
      </Popconfirm>
    </div>
  );
};