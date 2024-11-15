import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ServiceObject } from '../models/main/service-object';
import { Service } from '../models/service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: ApiService) { }

  private categories: Category[] = [];

  getCategories(params: {} = {}): Promise<Category[]> {
    let serviceObject = new ServiceObject('category');
    return this.apiService.GetAction(serviceObject, params)
      .then(x => {
        serviceObject = <ServiceObject>x;
        this.categories = <Category[]>serviceObject.data.category;
        return Promise.resolve(this.categories);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
