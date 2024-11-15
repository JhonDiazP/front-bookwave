import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StatusDocument } from '../models/status-document';
import { ServiceObject } from '../models/main/service-object';

@Injectable({
  providedIn: 'root'
})
export class StatusDocumentService {

  constructor(private apiService: ApiService) { }

  private statusDocument: StatusDocument[] = [];

  getStatusDocument(): Promise<StatusDocument[]> {
    let serviceObject = new ServiceObject('status_document');
    return this.apiService.GetAction(serviceObject)
      .then(x => {
        serviceObject = <ServiceObject>x;
        this.statusDocument = <StatusDocument[]>serviceObject.data.statusDocument
        return Promise.resolve(this.statusDocument);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
