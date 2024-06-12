import { IBaseClient } from './clients/base.client';

export class BaseService<T> {
    constructor(protected readonly client: IBaseClient){
    }

    getAll(): Promise<T[]> {
        return this.client.getAll();
    }

    getByID(id: number): Promise<T> {
        return this.client.getByID(id);
    }

    add(datum: { id: number; } & Partial<T>): Promise<boolean> {
        return this.client.add(datum);
    }

    deleteById(id: number): Promise<boolean> {
        return this.client.deleteById(id);
    }

    edit(datum: { id: number; } & Partial<T>): Promise<boolean> {
        return this.client.edit(datum);
    }
}