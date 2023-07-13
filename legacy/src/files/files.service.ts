import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { HttpError } from "../errors/HttpError";

class FileService {
  createFileImage(file: any): string {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "..", "static");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpError(500, "Что-то стряслоь при записи файла");
    }
  }
}

export const fileService = new FileService();
