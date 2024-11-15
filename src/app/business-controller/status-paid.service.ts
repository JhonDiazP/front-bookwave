import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { StatusPaid } from "../models/status-paid";
import { ServiceObject } from "../models/main/service-object";

@Injectable({
    providedIn: 'root'
})
export class StatusPaidService {
    constructor (private apiService: ApiService){}

    private status: StatusPaid[] = [];

    getStatusPaid(): Promise<StatusPaid[]> {
        let serviObject = new ServiceObject("status-paid");
        return this.apiService.GetAction(serviObject)
            .then(x => {
                serviObject = <ServiceObject>x;
                this.status = <StatusPaid[]>serviObject.data.statusPaid
                return Promise.resolve(this.status);
            })
            .catch(x => {
                throw x.message;
            });
    }
}
