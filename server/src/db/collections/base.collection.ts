import { BaseDB } from "@interfaces/db.interface";
import { Injectable } from "@nestjs/common";

export class BaseCollection<T> {
    constructor(protected readonly baseDB: BaseDB, private readonly collectionName: string){}

    public async getAll() {
        return this.baseDB.getAll<T>(this.collectionName);
    }
}