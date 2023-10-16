import { User } from "../dto/auth.dto";

export interface FileItem {
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  user: User;
  deletedAt: string | null;
  id: number;
}