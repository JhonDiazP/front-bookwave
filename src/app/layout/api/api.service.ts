import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/models/main/service-object';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data(data: any) {
    throw new Error('Method not implemented.');
  }
  status: any;
  message: string | undefined;

  constructor(private httpClient: HttpClient) { }

  private endPoint = environment.api;

  async GetAction(serviceObject: ServiceObject, params = {}): Promise<ServiceObject> {
    let endPoint;
      endPoint= environment.api;
    return this.httpClient
      .get(`${endPoint}${serviceObject.entity}${ serviceObject.id ? '/' + serviceObject.id : ''}`,
        {
          params,
        })
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async PostAction(serviceObject: ServiceObject,apiticket?:boolean): Promise<ServiceObject> {
    let endPoint;
      endPoint= environment.api;
    return this.httpClient
      .post(`${endPoint}${serviceObject.entity}${serviceObject.id
        ? '/' + serviceObject.id : ''}`, serviceObject.data, {})
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async PutAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .put(`${this.endPoint}${serviceObject.entity}${(serviceObject.id ? ('/' + serviceObject.id) : '')}`, serviceObject.data)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async PatchAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .patch(`${this.endPoint}${serviceObject.entity}${serviceObject.id ? '/'+serviceObject.id : ''}`, serviceObject.data)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async Login(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .post(`${this.endPoint}${serviceObject.entity}?email=${serviceObject.data.email}&password=${serviceObject.data.password}`, serviceObject.data)
      .toPromise()
      .then(x => {
        var servObj = new ServiceObject();
        servObj.data = x;
        return Promise.resolve(<ServiceObject>servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  async DeleteAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .delete(`${this.endPoint}${serviceObject.entity}${serviceObject.id ? '/'+serviceObject.id : ''}`)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }
}
