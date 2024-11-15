import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Period } from "../models/period";
import { ServiceObject } from "../models/main/service-object";


@Injectable({
    providedIn: 'root'
})
export class PeriodService {

    constructor(private apiService: ApiService) { }

    private period: Period[] = []

    getPeriods(): Promise<Period[]> {
        let serviObject = new ServiceObject("period");
        return this.apiService.GetAction(serviObject)
            .then(x => {
                serviObject = <ServiceObject>x;
                this.period = <Period[]>serviObject.data.periods
                return Promise.resolve(this.period);
            })
            .catch(x => {
                throw x.message;
            });
    }
}
