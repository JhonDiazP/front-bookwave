import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HistoryDocument } from '../models/history-document';
import { ServiceObject } from '../models/main/service-object';

@Injectable({
  providedIn: 'root'
})
export class HistoryDocumentService {

  constructor(private apiService: ApiService) { }

  private historyDocument: HistoryDocument[] = [];

  getHistoryDocument(params: {}): Promise<HistoryDocument[]> {
    let serviceObject = new ServiceObject('history_document');
    return this.apiService.GetAction(serviceObject, params)
      .then(x => {
        serviceObject = <ServiceObject>x;
        this.historyDocument = <HistoryDocument[]>serviceObject.data.historyDocument
        return Promise.resolve(this.historyDocument);
      })
      .catch(x => {
        throw x.message;
      });
  }

  public Save(HistoryDocument: HistoryDocument): Promise<ServiceObject> {
    var servObj = new ServiceObject("history_document");
    servObj.data = HistoryDocument;
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
