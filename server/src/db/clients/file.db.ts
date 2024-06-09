import { Injectable } from "@nestjs/common";
import { BaseDB } from "./base.db";
import {readdirSync, readFileSync} from 'fs';

@Injectable()
export class FileDB extends BaseDB {
    private collections: Record<string, any[]> = {};
    private DB_LOCATION = "D://Projects//interviews//briefcam//server//db";

    constructor() {
        super();
        this.readFiles();
    }

    private async readFiles() {
        try {
            const dir = await readdirSync(this.DB_LOCATION);
            for(const fileName of dir) {
                const contents = await readFileSync(`${this.DB_LOCATION}/${fileName}`, 'utf-8');
                this.collections[fileName.replace('\.json', '')] = JSON.parse(contents);
            }
        } catch (e) {
            console.error('failure while loading db');
        }
    }

    async getByID<T>(collectionName: string, id: string): Promise<T> {
        try {
            const idNumber = parseInt(id);
            const data: {id: number}[] = this.collections[collectionName];
            return data.find(datum => datum["id"] === idNumber) as T;
        } catch (e) {
            return {id: -1} as T;
        }
    }

    async add<T>(collectionName: string, datum: { id: string; } & Partial<T>): Promise<void> {
        this.collections[collectionName].push(datum);
    }

    async getAll<T>(collectionName: string): Promise<T[]> {
        return this.collections[collectionName];
    }

    async deleteById<T>(collectionName: string, id: string): Promise<void> {
        this.collections[collectionName] = this.collections[collectionName].filter(datum => datum.id !== id);
    }

    async edit<T>(collectionName: string, datum: { id: string; } & Partial<T>): Promise<void> {
        this.deleteById(collectionName, datum.id);
    }
}