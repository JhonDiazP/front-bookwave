import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Gender } from '../models/gender';
import { ServiceObject } from '../models/main/service-object';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private apiService: ApiService) { }

  private genders: Gender[] = [];

  getGenders(): Promise<Gender[]> {
    let serviObject = new ServiceObject('gender');
    return this.apiService.GetAction(serviObject)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.genders = <Gender[]>serviObject.data.gender
        return Promise.resolve(this.genders);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
