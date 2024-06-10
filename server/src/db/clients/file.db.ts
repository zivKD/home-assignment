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

    async getByProperty<T>(collectionName: string, propertyName: string, propertyValue: string | number): Promise<T> {
        return this.collections[collectionName].filter(datum => datum[propertyName] === propertyValue) as T;
    }

    async getByID<T>(collectionName: string, id: string): Promise<T> {
        try {
            const idNumber = parseInt(id);
            return (await this.getByProperty(collectionName, 'id', idNumber))[0];
        } catch (e) {
            return {id: -1} as T;
        }
    }

    async add<T>(collectionName: string, datum: { id: string; } & Partial<T>): Promise<boolean> {
        this.collections[collectionName].push(datum);
        return true;
    }

    async getAll<T>(collectionName: string): Promise<T[]> {
        return this.collections[collectionName];
    }

    async deleteById<T>(collectionName: string, id: string): Promise<boolean> {
        const indexToRemove = this.collections[collectionName].findIndex(datum => datum.id === id);
        if (indexToRemove !== -1) {
            this.collections[collectionName].splice(indexToRemove, 1);
            return true;
        }

        return false;
    }

    async edit<T>(collectionName: string, datum: { id: string; } & Partial<T>): Promise<boolean> {
        if(this.deleteById(collectionName, datum.id)) {
            return this.add(collectionName, datum);
        }

        return false;
    }
}