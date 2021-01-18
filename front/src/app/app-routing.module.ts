import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {TodolistComponent} from './components/todolist/todolist.component';
import {TodolistDetailComponent} from './components/todolist-detail/todolist-detail.component';
import {ClientGuard} from './guards/client/client.guard';
import { AccountComponent } from './components/account/account.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';


const routes: Routes = [{path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'todo', component: TodolistComponent, canActivate: [ClientGuard]},
  {path: 'todo/:id', component: TodolistDetailComponent, canActivate: [ClientGuard]},
  {path: 'account/:id', component: AccountComponent, canActivate: [ClientGuard]},
  {path: '**', redirectTo: 'todo', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
