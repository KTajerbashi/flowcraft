import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

export class ApiService extends BaseService {
    private readonly baseUrl: string;

    constructor(
        protected readonly http: HttpClient,
        controller: string
    ) {
        super();

        this.baseUrl = `api/${controller}/`;
    }

    protected onGet<T>(
        endpoint: string
    ): Observable<IApiResponse<T>> {
        return this.http.get<IApiResponse<T>>(
            `${this.baseUrl}${endpoint}`
        );
    }

    protected onPost<T>(
        endpoint: string,
        data: object
    ): Observable<IApiResponse<T>> {
        return this.http.post<IApiResponse<T>>(
            `${this.baseUrl}${endpoint}`,
            data
        );
    }

    protected onPut<T>(
        endpoint: string,
        data: object
    ): Observable<IApiResponse<T>> {
        return this.http.put<IApiResponse<T>>(
            `${this.baseUrl}${endpoint}`,
            data
        );
    }

    protected onDelete<T>(
        endpoint: string,
        body?: object
    ): Observable<IApiResponse<T>> {
        return this.http.delete<IApiResponse<T>>(
            `${this.baseUrl}${endpoint}`,
            { body }
        );
    }

}