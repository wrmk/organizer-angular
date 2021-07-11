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
  update:Project[] = [];
  projects:Project[] = [];

  constructor(private http: HttpClient) { }

  getProjects():Observable<Project[]>{
    // let projects: Project[] = [];
    const urlGet:string = `${this.Url}projects`;
    return this.http.get(urlGet).pipe(map(data => {
      return this.transform(data,this.projects);
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
    let update: Project[] = [];
    this.http.post(urlPost,{
      "title": projectName,
      "text": newToDo
    }).toPromise().then(data => {
      if (data){
        this.update =this.transform(data,update);
        this.updateProjects();
      }
    });
  }

  getUpdate():Observable<Project[]>{
    return of(this.projects);
  }

  updateProjects(){
    if (this.update[0].id <= this.projects.length){
      this.projects.map((e)=>{
        if (e.id === this.update[0].id){
          e.todos.push(...this.update[0].todos)}
        return e}
        );      
    } else {
      this.projects.push(...this.update)
    }
  } 

  transform(data:any,value:Project[]){
    for (let key in data)
    if (data.hasOwnProperty(key))
    value.push(data[key])
    return value = plainToClass(Project,value);
  }

}
