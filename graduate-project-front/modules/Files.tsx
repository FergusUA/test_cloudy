import React from "react";
import { FileItem } from "../api/dto/files.dto";
import { Actions } from "../component/Actions";
import { FileList, FileSelectType } from "../component/FileList";
import { Empty } from "antd";


import * as Api from "../api";

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
  };

  const onClickShare = async () => {
    if (selectedIds.length > 0) {
      const fileId = selectedIds[0]; // Получаем идентификатор первого выбранного файла
      const fileItems = await Api.files.get([fileId]);
      if (fileItems.length > 0) {
        const fileItem = fileItems[0];
        const response = await fetch(`http://localhost:3000/files/${fileId}/download`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileItem.filename; // теперь получаем доступ к свойству filename одного объекта FileItem
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <Actions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};