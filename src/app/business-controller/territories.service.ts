import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Country } from '../models/territories/country';
import { ServiceObject } from '../models/main/service-object';
import { Region } from '../models/territories/region';
import { Municipality } from '../models/territories/municipality';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  constructor(private apiService: ApiService) { }

  private countries: Country[] = [];
  private regions: Region[] = [];
  private municipalities: Municipality[] = [];

  getCountry(): Promise<Country[]> {
    let serviObject = new ServiceObject('countries');
    return this.apiService.GetAction(serviObject)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.countries = <Country[]>serviObject.data.country
        return Promise.resolve(this.countries);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getRegion(params: {}): Promise<Region[]> {
    let serviObject = new ServiceObject('department');
    return this.apiService.GetAction(serviObject, params)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.regions = <Region[]>serviObject.data.region
        return Promise.resolve(this.regions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getMunicipalities(params: {} = {}): Promise<Municipality[]> {
    let serviObject = new ServiceObject('municipality');
    return this.apiService.GetAction(serviObject, params)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.municipalities = <Municipality[]>serviObject.data.municipality
        return Promise.resolve(this.municipalities);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
