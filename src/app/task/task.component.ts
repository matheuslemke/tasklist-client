import { Component, OnInit } from '@angular/core';  
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { TaskService } from '../task.service';  
import { Task } from '../task';  
  
@Component({  
  selector: 'app-task',  
  templateUrl: './task.component.html',  
  styleUrls: ['./task.component.css']  
})  
export class TaskComponent implements OnInit {  
  dataSaved = false;  
  taskForm: any;  
  allTasks: Observable<Task[]>;  
  idTaskUpdate = null;  
  massage = null;  
  
  constructor(private formbulider: FormBuilder, private taskService:TaskService) { }  
  
  ngOnInit() {  
    this.taskForm = this.formbulider.group({  
      title: ['', [Validators.required]],  
      description: ['', [Validators.required]]  
    });  
    this.loadAllTasks();  
  }  
  loadAllTasks() {  
    this.allTasks = this.taskService.getAllTask();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const task = this.taskForm.value;  
    this.CreateTask(task);  
    this.taskForm.reset();  
  }  
  loadTaskToEdit(idTask: number) {  
    this.taskService.getTaskById(idTask).subscribe(task=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.idTaskUpdate = task.idTask;  
      this.taskForm.controls['title'].setValue(task.title);  
      this.taskForm.controls['description'].setValue(task.description);  
    });  
  
  }  
  CreateTask(task: Task) {  
    if (this.idTaskUpdate == null) {  
      this.taskService.createTask(task).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllTasks();  
          this.idTaskUpdate = null;  
          this.taskForm.reset();  
        }  
      );  
    } else {  
      task.idTask = this.idTaskUpdate;  
      this.taskService.updateTask(task).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllTasks();  
        this.idTaskUpdate = null;  
        this.taskForm.reset();  
      });  
    }  
  }   
  deleteTask(idTask: number) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.taskService.deleteTaskById(idTask).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllTasks();  
      this.idTaskUpdate = null;  
      this.taskForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.taskForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  
} 

