import { BaseDB } from "@interfaces/db.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileDB implements BaseDB {
    getAll<T>(columnName: string): Promise<T[]> {
        return require(`../../../db/${columnName}.json`);
    }
}