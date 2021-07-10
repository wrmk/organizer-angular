import { Injectable } from '@angular/core';
import { Type } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class Project {
  constructor() { }
  id: number;
  title: string;
  @Type(() => Todos)
  todos: Todos[];
}

export class Todos {
    id: number;
    text: string;
    isCompleted: boolean;
}