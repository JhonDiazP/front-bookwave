import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DocumentType } from '../models/document-type';
import { ServiceObject } from '../models/main/service-object';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private apiService: ApiService) { }

  private documentTypes: DocumentType[] = [];

  getDocumentTypes(): Promise<DocumentType[]> {
    let serviObject = new ServiceObject('document');
    return this.apiService.GetAction(serviObject)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.documentTypes = <DocumentType[]>serviObject.data.document
        return Promise.resolve(this.documentTypes);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
