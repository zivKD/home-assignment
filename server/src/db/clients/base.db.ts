import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BaseDB {
    abstract getAll<T>(collectionName: string): Promise<T[]>;
    abstract getByID<T>(collectionName: string, id: string): Promise<T>;
    abstract add<T>(collectionName: string, datum: {id: string} & Partial<T>): Promise<void>;
    abstract deleteById<T>(collectionName: string, id: string): Promise<void>;
    abstract edit<T>(collectionName: string, datum: {id: string} & Partial<T>): Promise<void>;
}