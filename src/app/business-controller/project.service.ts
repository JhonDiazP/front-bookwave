import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Project } from '../models/project';
import { ServiceObject } from '../models/main/service-object';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apiService: ApiService) { }

  private projects: Project[] = [];

  getProjects(): Promise<Project[]> {
    let serviObject = new ServiceObject('project');
    return this.apiService.GetAction(serviObject)
      .then(x => {
        serviObject = <ServiceObject>x;
        this.projects = <Project[]>serviObject.data.projects
        return Promise.resolve(this.projects);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
