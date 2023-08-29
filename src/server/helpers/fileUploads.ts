import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export const getUploadsBasePath = () => {
  return 'uploads';
};

export const generatePaperFileName = (extension: string = 'pdf') => {
  return `${randomUUID()}.${extension}`;
};

export const storeFile = (fileName: string, base64: string) => {
  const filePath = path.join(`public/${getUploadsBasePath()}`, fileName);
  fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
  return filePath;
};
