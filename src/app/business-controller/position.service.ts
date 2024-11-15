import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Position } from '../models/position';
import { ServiceObject } from '../models/main/service-object';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private apiService: ApiService) { }

  private positions: Position[] = [];

  getPositions(): Promise<Position[]> {
    let serviObject = new ServiceObject('position');
    return this.apiService.GetAction(serviObject)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.positions = <Position[]>serviObject.data.positions
        return Promise.resolve(this.positions);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
