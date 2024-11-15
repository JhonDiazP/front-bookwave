import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { UserRole } from "../models/user-role";
import { ServiceObject } from "../models/main/service-object";
import { Role } from "../models/role";

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {

    private roles: Role[] = [];

    constructor(private apiService: ApiService) {}

    getUserRoleById(id: number): Promise<any> {
        let servObj = new ServiceObject("user-role", id);
        return this.apiService.GetAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            return Promise.resolve(servObj.data.user_role);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }

    getRolesByUserId(id: string): Promise<Role[]> {
        let servObj = new ServiceObject("roles-by-user-id", id);
        return this.apiService.GetAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            this.roles = <Role[]>servObj.data.roles;
            return Promise.resolve(this.roles);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }

    getRoles(): Promise<Role[]> {
        let servObj = new ServiceObject("roles");
        return this.apiService.GetAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            this.roles = <Role[]>servObj.data.roles;
            return Promise.resolve(this.roles);
        }).catch(x => {
            throw x.status == 422 ? x : x.message;
        })
    }
}
