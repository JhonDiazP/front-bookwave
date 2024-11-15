import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { TypeFilePaid } from "../models/type-file-paid";
import { ServiceObject } from "../models/main/service-object";

@Injectable({
    providedIn: 'root'
})
export class TypeFilePaidService {
    constructor(private apiService: ApiService) {}

        private typePaidFile: TypeFilePaid[] = [];

        getTypePaids(): Promise<TypeFilePaid[]> {
            let serviObject = new ServiceObject('type-paid');
            return this.apiService.GetAction(serviObject)
                .then(x => {
                    serviObject = <ServiceObject>x;
                    this.typePaidFile = <TypeFilePaid[]>serviObject.data.typePaid
                    return Promise.resolve(this.typePaidFile);
                })
                .catch(x => {
                    throw x.message;
                });
        }

}
