import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BaseDB {
    abstract getAll<T>(collectionName: string): Promise<T[]>;
    abstract getByID<T>(collectionName: string, id: number): Promise<T>;
    abstract getByProperty<T>(collectionName: string, propertyName: string, propertyValue: string | number): Promise<T>;
    abstract add<T>(collectionName: string, datum: {id: number} & Partial<T>): Promise<boolean>;
    abstract deleteById<T>(collectionName: string, id: number): Promise<boolean>;
    abstract edit<T>(collectionName: string, datum: {id: number} & Partial<T>): Promise<boolean>;
}