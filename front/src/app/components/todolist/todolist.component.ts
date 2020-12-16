import { Component, OnInit, ViewChild } from '@angular/core';
import {Task} from '../../models/task';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiCallService} from '../../services/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  
  tasks: Task[] = [];

  taskForm: FormGroup;
  nameCtrl: FormControl;
  datetime: FormControl;

  constructor(private api: ApiCallService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.getTasks();
    this.nameCtrl = formBuilder.control('', Validators.required);
    this.datetime = formBuilder.control('', Validators.required);

    this.taskForm = this.formBuilder.group({
      name: this.nameCtrl,
      datetime: this.datetime
    });
  }

  getTasks() {
    this.api.getTasks()
      .subscribe(data => {
        this.tasks = data.sort((a, b) => {
          if(a.datetime > b.datetime)
            return 1
          if(a.datetime < b.datetime)
            return -1
          return 0
        });
      });
  }

  deleteTask(task: Task) {
    this.api.deleteTask(task._id)
      .subscribe(data => {
        this.getTasks();
      });
  }

  onSubmit(task) {
    if (task.name.length < 1) {
      return;
    }
    task.datetime = Date.parse(task.datetime)

    this.api.sendTask(task).subscribe(() => this.getTasks());
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset();
  }

  taskDetail(task: Task){
    this.router.navigate([`todo/${task._id}`])
  }

  formatDate(datetime: number): string {
    return new Date(datetime).toLocaleString();
  }
}
