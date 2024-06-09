
export interface BaseDB {
    getAll<T>(columnName: string): Promise<T[]>;
}