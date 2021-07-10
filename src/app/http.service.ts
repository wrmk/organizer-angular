import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Project } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  Url:string = environment.Url;
  todo:Project[] = [];

  constructor(private http: HttpClient) { }

  getProjects():Observable<Project[]>{
    let projects: Project[] = [];
    const urlGet:string = `${this.Url}projects`;
    return this.http.get(urlGet).pipe(map(data => {
      this.transform(data,projects);
      return projects = plainToClass(Project, projects);
    }));
  }

  changeStatus(projectId:number, todoId:number,isCompleted:boolean){
    const urlPatch:string = `${this.Url}projects/${projectId}/todos/${todoId}`;
    this.http.patch(urlPatch,{
      "isCompleted": isCompleted
    }).subscribe();
  }  

  save(projectName:string, newToDo:string){
    const urlPost: string = `${this.Url}todos`;
    let todo: Project[] = [];
    this.http.post(urlPost,{
      "title": projectName,
      "text": newToDo
    }).toPromise().then(data => {
      this.transform(data,todo);
      this.todo = plainToClass(Project,todo);
    });
  }

  getUpdate():Observable<Project[]>{
    return of(this.todo);
  }

  transform(data:any,value:Project[]){
    for (let key in data)
    if (data.hasOwnProperty(key))
    value.push(data[key])
    return value;
  }

}
