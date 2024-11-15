import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ServiceObject } from '../models/main/service-object';
import { ContractType } from '../models/contract-type';

@Injectable({
  providedIn: 'root'
})
export class ContractTypesService {

  constructor(private apiService: ApiService) { }

  private contractTypes: ContractType[] = [];

  getContractTypes(): Promise<ContractType[]> {
    let serviceObject = new ServiceObject('contract_types');
    return this.apiService.GetAction(serviceObject)
      .then(x => {
        serviceObject = <ServiceObject>x;
        this.contractTypes = <ContractType[]>serviceObject.data.contractType;
        return Promise.resolve(this.contractTypes);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
