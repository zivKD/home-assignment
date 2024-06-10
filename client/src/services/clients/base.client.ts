
export interface IBaseClient {
    getAll<T>(): Promise<T[]>;
    getByID<T>(id: number): Promise<T>;
    add<T>(datum: {id: number} & Partial<T>): Promise<void>;
    deleteById(id: number): Promise<void>;
    edit<T>(datum: {id: number} & Partial<T>): Promise<void>;
}