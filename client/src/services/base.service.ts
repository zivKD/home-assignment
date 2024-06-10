import { err, ok, Result } from 'neverthrow';
import { IBaseClient } from './clients/base.client';

export class BaseService<T> {
    constructor(private readonly client: IBaseClient){
    }

    getAll(): Promise<T[]> {
        return this.client.getAll();
    }

    getByID(id: number): Promise<T> {
        return this.client.getByID(id);
    }

    add(datum: { id: number; } & Partial<T>): Promise<void> {
        return this.client.add(datum);
    }

    deleteById(id: number): Promise<void> {
        return this.deleteById(id);
    }

    edit(datum: { id: number; } & Partial<T>): Promise<void> {
        return this.edit(datum);
    }
}