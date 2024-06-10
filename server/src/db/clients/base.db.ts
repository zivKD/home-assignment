import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BaseDB {
    abstract getAll<T>(collectionName: string): Promise<T[]>;
    abstract getByID<T>(collectionName: string, id: string): Promise<T>;
    abstract getByProperty<T>(collectionName: string, propertyName: string, propertyValue: string | number): Promise<T>;
    abstract add<T>(collectionName: string, datum: {id: string} & Partial<T>): Promise<boolean>;
    abstract deleteById<T>(collectionName: string, id: string): Promise<boolean>;
    abstract edit<T>(collectionName: string, datum: {id: string} & Partial<T>): Promise<boolean>;
}