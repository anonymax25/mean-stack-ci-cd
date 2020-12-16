import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.css']
})
export class TodolistDetailComponent implements OnInit {
  task: Task;

  constructor(private apiCallService: ApiCallService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.apiCallService.getTask(paramMap["params"]["id"]).subscribe(task => {
        this.task = task
      })
    })
    
  }

  formatDate(datetime: number): string {
    return new Date(datetime).toLocaleString();
  }

}
