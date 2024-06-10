import { IBaseClient } from "../base.client";
import { HttpProtocol } from "./http.protocol";

export class HttpClient implements IBaseClient {
    protected readonly http: HttpProtocol;

    constructor(private readonly path: string) {
        this.http = new HttpProtocol();
    }

    getAll<T>(): Promise<T[]> {
        return this.http.get(this.path);
    }

    getByID<T>(id: number): Promise<T> {
        return this.http.get(`${this.path}/id/${id}`);
    }

    add<T>(datum: { id: number; } & Partial<T>): Promise<void> {
        return this.http.post(`${this.path}/add`, {data: datum});
    }

    deleteById(id: number): Promise<void> {
        return this.http.delete(`${this.path}/id/${id}`);
    }

    edit<T>(datum: { id: number; } & Partial<T>): Promise<void> {
        return this.http.patch(`${this.path}/edit`, {data: datum});
    }
}