import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceObject } from '../models/main/service-object';
import { Observable, firstValueFrom } from 'rxjs';
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
    const endPoint = environment.api;
    try {
      const response = await firstValueFrom(
        this.httpClient.get<ServiceObject>(
          `${endPoint}${serviceObject.entity}${serviceObject.id ? '/' + serviceObject.id : ''}`,
          { params }
        )
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetAction2(serviceObject: ServiceObject, params = {}): Promise<ServiceObject> {
    const endPoint = environment.apiWeb;
    try {
      const response = await firstValueFrom(
        this.httpClient.get<ServiceObject>(
          `${endPoint}${serviceObject.entity}${serviceObject.id ? '/' + serviceObject.id : ''}`,
          { params }
        )
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async PostAction(serviceObject: ServiceObject, apiticket?: boolean): Promise<ServiceObject> {
    const endPoint = environment.api;
    try {
      return await firstValueFrom(
        this.httpClient.post<ServiceObject>(
          `${endPoint}${serviceObject.entity}${serviceObject.id ? '/' + serviceObject.id : ''}`,
          serviceObject.data
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async PutAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    try {
      return await firstValueFrom(
        this.httpClient.put<ServiceObject>(
          `${this.endPoint}${serviceObject.entity}${serviceObject.id ? '/' + serviceObject.id : ''}`,
          serviceObject.data
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async PatchAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    try {
      return await firstValueFrom(
        this.httpClient.patch<ServiceObject>(
          `${this.endPoint}${serviceObject.entity}${serviceObject.id ? '/' + serviceObject.id : ''}`,
          serviceObject.data
        )
      );
    } catch (error) {
      throw error;
    }
  }

    async Login(serviceObject: ServiceObject): Promise<ServiceObject> {
        try {
            const response: any = await firstValueFrom(
                this.httpClient.post<any>( // Cambia el tipo a `any` para capturar la estructura real de la respuesta
                    `${this.endPoint}${serviceObject.entity}?email=${serviceObject.data.email}&password=${serviceObject.data.password}`,
                    serviceObject.data
                )
            );

            // Aquí debes asignar manualmente la data que recibes a tu objeto de servicio
            const servObj = new ServiceObject();
            servObj.data = {
                access_token: response.access_token,
                user_id: response.user_id,
                token_type: response.token_type,
                expires_in: response.expires_in
            };

            return servObj;
        } catch (error) {
            throw error;
        }
    }

    async DeleteAction(serviceObject: ServiceObject): Promise<ServiceObject> {
        try {
          return await firstValueFrom(
            this.httpClient.delete<ServiceObject>(
              `${this.endPoint}${serviceObject.entity}${serviceObject.id ? '/' + serviceObject.id : ''}`
            )
          );
        } catch (error) {
          throw error;
        }
      }
}
