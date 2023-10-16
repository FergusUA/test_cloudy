import { Extension } from "../utils/getColByExt";

export const getExtension = (filename: string) => {
  return filename.split(".").pop() as Extension;
};