import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.getTasks();
    this.nameCtrl = formBuilder.control('', Validators.required);
    this.daysCtrl = formBuilder.control('', Validators.required);

    this.taskForm = this.formBuilder.group({
      name: this.nameCtrl,
      days: this.daysCtrl
    });
  }

  getTasks() {
    const userId = this.authService.getUserFromSessionStorage()._id
    this.taskService.getTasks(userId)
      .subscribe(data => {
        this.tasks = data;
      });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id)
      .subscribe(data => {
        this.getTasks();
      });
  }

  onSubmit(task) {
    // Process checkout data here
    if (task.name.length < 1 || task.days.length < 1) {
      return;
    }
    task.datetime = Date.parse(task.datetime)

    this.taskService.createTask(task).subscribe(() => this.getTasks());
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset();
  }

  taskDetail(task: Task){
    this.router.navigate([`todo/${task._id}`])
  }
}
