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
      this.http.getUpdate().subscribe((data: Project[]) => this.projects = data);
    });
  }

  trackByProjects(index:number, item:Project) {
    return index;
  }
  trackByTodos(index:number, item:Todos) {
    return index;
  }  

}



