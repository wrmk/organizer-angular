import { Component, OnInit, Inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';
import { Project } from '../project.service';

export interface DialogData {
  projects: Project[];
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  projectsTitle: string[] = [];
  toggle: boolean = false;
 
  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: DialogData) {
              this.projectsTitle = data.projects.map (i =>{
                let container: string = '';
                container = i.title;
                return container;
              })
              this.projectsTitle.push("Новая категория");         
  }

  ngOnInit() {
    this.form = this.fb.group({
      newToDo:['',[Validators.required,Validators.minLength(1),this.noWhitespaceValidator]],
      projectName:[''],
      newProjectName:['Новая категория',[Validators.required,Validators.minLength(1),this.noWhitespaceValidator]],
    });
  }

  save(){
    let {newToDo, projectName, newProjectName} = this.form.value;
    const {value, valid} = this.form;
    if (valid){
      this.dialogRef.close(this.form.value);
        if (projectName === 'Новая категория'){
          projectName = newProjectName
        };
      this.httpService.save(projectName, newToDo);
    }
  }

  close(){
    this.dialogRef.close();
  }

  isExistProjectName(){
    const {projectName} = this.form.value;
    if (projectName === 'Новая категория'){
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
