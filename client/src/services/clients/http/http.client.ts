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

    getByID<T>(id: string): Promise<T> {
        return this.http.get(`${this.path}/id/${id}`);
    }

    add<T>(datum: { id: string; } & Partial<T>): Promise<void> {
        return this.http.post(`${this.path}/add`, {data: datum});
    }

    deleteById(id: string): Promise<void> {
        return this.http.delete(`${this.path}/id/${id}`);
    }

    edit<T>(datum: { id: string; } & Partial<T>): Promise<void> {
        return this.http.patch(`${this.path}/edit`, {data: datum});
    }
}