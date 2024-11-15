import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ServiceObject } from '../models/main/service-object';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Permissions } from '../models/permissions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private apiService: ApiService, private router: Router) { }

  Save(user: User): Promise<ServiceObject> {
    var servObj = new ServiceObject("register");
    servObj.data = user;
    return this.apiService.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  Update(user: User): Promise<ServiceObject> {
    var servObj = new ServiceObject("user", user.id);
    servObj.data = user;
    return this.apiService.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  } 

  Delete(id: string): Promise<ServiceObject> {
    var servObj = new ServiceObject("user", id);
    return this.apiService.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  Enable(id: string): Promise<ServiceObject> {
    var servObj = new ServiceObject("enable_user", id);
    return this.apiService.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  getUsers(params: {} = {}): Promise<User[]> {
    let servObj = new ServiceObject("user");
    return this.apiService.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        const users = <User[]>servObj.data.users;
        console.log(x)
        return Promise.resolve(users);
      }).catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  gerUserById(id: string): Promise<User> {
    let servObj = new ServiceObject("user", id);
    return this.apiService.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        const user = <User>servObj.data.user;
        return Promise.resolve(user);
      }).catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  CheckPermission(checked: string): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const check = checked.split('.');
    const itemKeySearch = check.length === 1 ? 'item.route' : 'item.code';
    const itemValueSearch = check.length === 1 ? this.router.url : check[0];
    const perm = check.length === 1 ? check[0] : check[1];
    const keysplit = itemKeySearch.split('.');
    let show = false;
    if(permissions){
      permissions.map((permission: Permissions) => {
        const key1 = keysplit[0] as keyof Permissions;
        const key2 = keysplit[1] as keyof Permissions[keyof Permissions];
        if (itemValueSearch.includes(permission[key1][key2]) && permission.permission.action === perm) {
          show = true;
        }
      });
    }

    return show;
  }
}
