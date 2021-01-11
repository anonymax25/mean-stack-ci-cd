import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.css']
})
export class TodolistDetailComponent implements OnInit {
  task: Task;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.taskService.getTask(paramMap["params"]["id"]).subscribe(task => {
        this.task = task
        console.log(task);
        
      })
    })
    
  }

}
