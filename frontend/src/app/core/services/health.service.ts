import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";

export class HealthService extends ApiService {

    constructor(http: HttpClient) {
        super(http, ''); // Pass endpoint directly
    }

    onGetHealth() {
        return this.onGet<HealthResponse>('/health');
    }
}