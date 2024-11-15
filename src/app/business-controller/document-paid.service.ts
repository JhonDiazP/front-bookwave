import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { DocumentPaid} from "../models/document-paid";
import { ServiceObject } from "../models/main/service-object";


@Injectable({
    providedIn: 'root'
})
export class DocumentPaidService {
    constructor (private apiService: ApiService){}

    public getDocumentPaid (params: {} = {}): Promise<any>{
        let servObj = new ServiceObject('document-paid');
        return this.apiService.GetAction(servObj, params)
        .then(x => {
            servObj = <ServiceObject>x;
            const documentPaid = <any>servObj.data.documentPaid;
            return Promise.resolve(documentPaid);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }

    public Save(documentPaid: DocumentPaid): Promise<ServiceObject> {
        var servObj = new ServiceObject("document-paid");
        servObj.data = documentPaid;
        return this.apiService.PostAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            return Promise.resolve(servObj);
        })
        .catch(x => {
            throw x.status == 422 ? x : x.message;
        });
    }

    public Radicate(user_paid: number): Promise<ServiceObject> {
        var servObj = new ServiceObject("document-paid/radicate/" + user_paid);
        servObj.data = user_paid;
        return this.apiService.PutAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            return Promise.resolve(servObj);
        })
        .catch(x => {
            throw x.status == 422 ? x : x.message;
        });
    }

    public Delete(id: number): Promise<ServiceObject> {
        var servObj = new ServiceObject("document-paid/" + id);
        return this.apiService.DeleteAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            return Promise.resolve(servObj);
        })
        .catch(x => {
            throw x.status == 422 ? x : x.message;
        });
    }
}
