import { Component, OnInit, ViewChild } from '@angular/core';
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
  datetime: FormControl;

  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              public authService: AuthService,
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
    const userId = this.authService.getUserFromSessionStorage()._id;
    this.taskService.getTasks(userId).subscribe(data => {
        this.tasks = data.sort((a, b) => {
          if (a.datetime > b.datetime) {
            return 1;
          }
          if (a.datetime < b.datetime) {
            return -1;
          }
          return 0;
        });
      });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id).subscribe(() => {
        this.getTasks();
      });
  }

  onSubmit(task) {
    if (task.name.length < 1) {
      return;
    }
    task.datetime = Date.parse(task.datetime)
    this.taskService.createTask(task).subscribe(() => this.getTasks());
    this.taskForm.reset();
  }

  taskDetail(task: Task) {
    this.router.navigate([`todo/${task._id}`]);
  }

  formatDate(datetime: number): string {
    return new Date(datetime).toLocaleString();
  }

  isOverdue(task: Task): boolean {
    return task.datetime < Date.now();
  }

  goToAccount() {
    this.router.navigate([`account/${this.authService.getUserFromSessionStorage()._id}`]);
  }
}
