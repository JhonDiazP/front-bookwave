import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ServiceObject } from '../models/main/service-object';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesBusiness {

  constructor(private apiService: ApiService) { }

  private services: Service[] = [];

  Save(service: FormData): Promise<ServiceObject> {
    var servObj = new ServiceObject("service");
    servObj.data = service;
    return this.apiService.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  getServices(params: {} = {}): Promise<Service[]> {
    let serviceObject = new ServiceObject('service');
    return this.apiService.GetAction(serviceObject, params)
      .then(x => {
        serviceObject = <ServiceObject>x;
        this.services = <Service[]>serviceObject.data.service;
        return Promise.resolve(this.services);
      })
      .catch(x => {
        throw x.message;
      });
  }

  gerServiceById(id: string): Promise<Service> {
    let servObj = new ServiceObject("service", id);
    return this.apiService.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        const service = <Service>servObj.data.service;
        return Promise.resolve(service);
      }).catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  getUnavailableHours(serviceId: string, date: string): Promise<any> {
    let servObj = new ServiceObject("services/"+serviceId+"/unavailable-hours");
    return this.apiService.GetAction(servObj, {date: date})
      .then(x => {
        servObj = <ServiceObject>x;
        const service = <Service>servObj.data.unavailable_hours;
        return Promise.resolve(service);
      }).catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }

  hireService(data: {} = {}): Promise<ServiceObject> {
    let servObj = new ServiceObject("hire_service");
    servObj.data = data;
    return this.apiService.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 422 ? x : x.message;
      });
  }
}
