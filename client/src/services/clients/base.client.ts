
export interface IBaseClient {
    getAll<T>(): Promise<T[]>;
    getByID<T>(id: number): Promise<T>;
    add<T>(datum: {id: number} & Partial<T>): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    edit<T>(datum: {id: number} & Partial<T>): Promise<boolean>;
}