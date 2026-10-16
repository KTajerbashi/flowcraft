import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class ApiService extends BaseService {
    getHealth(): Observable<HealthResponse> {
        return this.get<HealthResponse>('/health');
    }
}