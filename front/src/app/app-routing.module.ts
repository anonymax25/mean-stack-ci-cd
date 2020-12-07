import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {TodolistComponent} from "./components/todolist/todolist.component";
import {TodolistDetailComponent} from "./components/todolist-detail/todolist-detail.component";
import {ClientGuard} from "./guards/client/client.guard";


const routes: Routes = [{path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'todolist', component: TodolistComponent, canActivate: [ClientGuard]},
  {path: 'todo/:id', component: TodolistDetailComponent, canActivate: [ClientGuard]},
  {path: '**', redirectTo: 'todolist', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
