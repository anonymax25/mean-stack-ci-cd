import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodolistComponent } from './components/todolist/todolist.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodolistDetailComponent } from './components/todolist-detail/todolist-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { AvatarFormComponent } from './components/account/avatar-form/avatar-form.component';
import { AccountComponent } from './components/account/account.component';
@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    LoginComponent,
    SignupComponent,
    TodolistDetailComponent,
    NavbarComponent,
    AccountComponent,
    AvatarFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
