import { Request } from 'express';

export interface IRequestContext {
  requestId?: string;
  userId?: string;
  request: Request;
}

export class RequestContext {

  constructor(
    public readonly request: Request
  ) {}

  get requestId(): string | undefined {
    return this.request.headers['x-request-id'] as string | undefined;
  }

  get userId(): string | undefined {
    return this.request.headers['x-user-id'] as string | undefined;
  }
}