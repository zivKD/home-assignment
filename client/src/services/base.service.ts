import { err, ok, Result } from 'neverthrow';
import { IBaseClient } from './clients/base.client';

export abstract class BaseService {
    constructor(private readonly client: IBaseClient){
    }
}