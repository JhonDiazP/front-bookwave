import { Injectable } from '@angular/core';
import { Auth } from './models/auth';
import { ApiService } from './api/api.service';
import { ServiceObject } from '../app/models/main/service-object';
import { environment } from '../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from './models/role';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: Auth;
  private token_ticket!: Auth;
  currentUser = {};

  constructor(private apiService: ApiService) { }


  Login(email: any, password: any):Promise<ServiceObject> {
    var servObj = new ServiceObject("login");
    servObj.data = {email: email, password: password};
    return this.apiService.Login(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        console.log(servObj);
        this.SaveToken(servObj.data);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : 'Error en el servidor';
      });
    }

  LoginGoogle():Promise<ServiceObject> {
    console.log("entra");
    var servObj = new ServiceObject("google-auth/redirect");
    return this.apiService.Login(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        this.SaveToken(servObj.data);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : 'Error en el servidor';
      });
    }

    GetUserById(id:string): Promise<any> {
      var servObj = new ServiceObject('user', id);
        return this.apiService.GetAction(servObj)
          .then(x => {
            servObj = <ServiceObject>x;
            // this.SaveUser(servObj.data.user)
            return Promise.resolve(servObj.data);
          })
          .catch(x => {
            throw x.message;
          });
    }

    GetToken(): Auth {
      this.token = {
        access_token: localStorage.getItem('access_token') || '',
        token_type: localStorage.getItem('token_type') || '',
        expires_in: localStorage.getItem('expires_in') || '',
        init_time_exp: null || '',
      };

      return this.token;
    }

    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return authToken !== null ? true : false;
    }

    LogOut(): void {
      let persists = [];
      for(let i in localStorage){
        let value = localStorage.getItem(i);
        if(value && value.includes('persist|')){
          value = value.replace('persist|', '');
          persists.push(value)
        }
      }
      localStorage.clear();
      this.persistStorage(persists);
    }

    persistStorage(values: any[]){
      if(values && values.length > 0){
        values.forEach(e =>{
          if(e.split('|').length > 0){
            let code = e.split('|')[0];
            let value = e.split('|')[1];
            localStorage.setItem(code, value);
          }
        })
      }
    }

    GetUser(): any {
      var user: any;
      user = JSON.parse(localStorage.getItem('user') ?? '[]');
      return user;
    }

    GetRole(): number {
      return Number(localStorage.getItem('role_id'));
    }

    GetUserRoleId(): number {
      return this.GetUser() ? this.GetUser()?.roles.find((role: Role) => role.id = this.GetRole()).pivot.id : 0;
    }

    ChangeRole(role: string) {
      localStorage.setItem('role_id', role);
    }

  private SaveToken(data: any): void {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('expires_in', data.expires_in);
    localStorage.setItem('init_time_exp', Date.now().toString());
  }

  SaveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role_id', user.roles[0].id);
  }


}


