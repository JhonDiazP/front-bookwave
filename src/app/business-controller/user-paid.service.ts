import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { UserPaid } from "../models/user-paid";
import { ServiceObject } from "../models/main/service-object";


@Injectable({
    providedIn: 'root'
})
export class UserPaidService {
    constructor (private apiService: ApiService){}

    public getUsersPaid (params: {} = {}): Promise<any> {
        let servObj = new ServiceObject("user-paid");
        return this.apiService.GetAction(servObj, params)
        .then(x => {
            servObj = <ServiceObject>x;
            const userPaid = <any>servObj.data.userPaid;
            return Promise.resolve(userPaid);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }

    public getUsersPaidByUser (user_id: number): Promise<UserPaid[]> {
        let servObj = new ServiceObject("user-paid/byUser/" + user_id);
        return this.apiService.GetAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            const userPaid = <UserPaid[]>servObj.data.userPaid;
            return Promise.resolve(userPaid);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }

    public Save(userPaid: any): Promise<ServiceObject> {
        var servObj = new ServiceObject("user-paid");
        servObj.data = userPaid;
        return this.apiService.PostAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            return Promise.resolve(servObj);
        })
        .catch(x => {
            throw x.status == 422 ? x : x.message;
        });
    }

    public getUserPaidById(id: number): Promise<UserPaid> {
        let servObj = new ServiceObject("user-paid", id);
        return this.apiService.GetAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            const userPaid = <UserPaid>servObj.data.userPaid;
            return Promise.resolve(userPaid);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }
}
