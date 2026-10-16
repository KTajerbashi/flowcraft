import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';


@Injectable({
    providedIn: 'root'
})
export class WorkflowService extends ApiService {

    constructor(http: HttpClient) {
        super(http, 'workflows');
    }

    onGetWorkflows(): Observable<IWorkflow[]> {
        return this.onGet<IWorkflow[]>('').pipe(
            map(response => response.data)
        );
    }
}