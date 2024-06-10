import { BaseDB } from "@dbclients/base.db";

export class BaseCollection<T> {
    constructor(protected readonly baseDB: BaseDB, protected readonly collectionName: string){}

    public async getAll() {
        return this.baseDB.getAll<T>(this.collectionName);
    }

    public async getById(id: string) {
        return this.baseDB.getByID<T>(this.collectionName, id);
    }
    public async add(datum: {id: number} & Partial<T>) {
        return this.baseDB.add<T>(this.collectionName, datum as ({id: string} & T));
    }
    public async deleteById(id: string) {
        return this.baseDB.deleteById<T>(this.collectionName, id);
    }
    public async edit(datum: {id: number} & Partial<T>) {
        return this.baseDB.edit<T>(this.collectionName, datum as ({id: string} & T));
    }
}