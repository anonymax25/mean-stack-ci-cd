import { Component, OnInit } from '@angular/core';
import {Task} from '../../task';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiCallService} from '../../services/api-call.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  tasks: Task[] = [];

  taskForm: FormGroup;
  nameCtrl: FormControl;
  daysCtrl: FormControl;

  constructor(private api: ApiCallService,
              private formBuilder: FormBuilder) {
    this.getTasks();
    this.nameCtrl = formBuilder.control('', Validators.required);
    this.daysCtrl = formBuilder.control('', Validators.required);

    this.taskForm = this.formBuilder.group({
      name: this.nameCtrl,
      days: this.daysCtrl
    });
  }

  getTasks() {
    this.api.getTasks()
      .subscribe(data => {
        this.tasks = data;
      });
  }

  deleteTask(task: Task) {
    this.api.deleteTask(task._id)
      .subscribe(data => {
        this.getTasks();
      });
  }

  onSubmit(task) {
    // Process checkout data here
    if (task.name.length < 1 || task.days.length < 1) {
      return;
    }
    this.api.sendTask(task).subscribe(() => this.getTasks());
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset();
  }
}
