
export interface IBaseClient {
    getAll<T>(): Promise<T[]>;
    getByID<T>(id: number): Promise<T>;
    getByProperty<T>(propertyName: string, propertyValue: unknown): Promise<T>;
    // NOTE: boolean is not sufficent for actual real life API's. You would need to establish a response format that allowes you to
    // encapsulate many problems
    add<T>(datum: {id: number} & Partial<T>): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    // NOTE: boolean is not sufficent for actual real life API's. You would need to establish a response format that allowes you to
    // encapsulate many problems
    edit<T>(datum: {id: number} & Partial<T>): Promise<boolean>;
}