import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { HttpService } from './http.service';
import { Project, Todos } from './project.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(private dialog: MatDialog,
              private http: HttpService){}

  projects:Project[] = [];
  update: Project[] = [];

  
  ngOnInit(){
    this.http.getProjects().subscribe((data: Project[]) => this.projects = data);
  }

  changeStatus(projectId:number, todoId:number,isCompleted:boolean){
    this.http.changeStatus(projectId, todoId,isCompleted);
  }

  openDialog() {
    const dialogConfig:MatDialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      projects: this.projects
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      if (data){ 
          this.http.getUpdate().subscribe((data: Project[]) => this.update = data);
          if (this.update.length != 0){
            console.log(this.update)
            this.updateProjects()      
          }
      }
    });
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

  trackByProjects(index:number, item:Project) {
    return index;
  }
  trackByTodos(index:number, item:Todos) {
    return index;
  }  

}



