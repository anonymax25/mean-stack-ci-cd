import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistDetailComponent } from './todolist-detail.component';

describe('TodolistDetailComponent', () => {
  let component: TodolistDetailComponent;
  let fixture: ComponentFixture<TodolistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
