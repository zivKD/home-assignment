
export interface IBaseClient {
    getAll<T>(): Promise<T[]>;
    getByID<T>(id: string): Promise<T>;
    add<T>(datum: {id: string} & Partial<T>): Promise<void>;
    deleteById(id: string): Promise<void>;
    edit<T>(datum: {id: string} & Partial<T>): Promise<void>;
}