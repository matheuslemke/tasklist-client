import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  url = 'https://lemke-tasklist-supero.herokuapp.com/tasks';

  constructor(private http: HttpClient) {
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + '/');
  }

  getTaskById(TaskId: number): Observable<Task> {
    return this.http.get<Task>(this.url + '/' + TaskId);
  }

  createTask(Task: Task): Observable<Task> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Task>(this.url + '/', Task, httpOptions);
  }

  updateTask(Task: Task): Observable<Task> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Task>(this.url + '/', Task, httpOptions);
  }

  deleteTaskById(TaskId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/' + TaskId, httpOptions);
  }

}

