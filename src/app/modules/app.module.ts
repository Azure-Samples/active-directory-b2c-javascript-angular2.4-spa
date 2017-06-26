import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { NgModule }		        from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }        from '../components/home.component';
import { TodoComponent }        from '../components/todo.component';
import { TodoService }          from '../services/todo.service';
import { MsalService }          from '../services/msal.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'todo', component: TodoComponent }
];

@NgModule({
    imports: [ FormsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes, { useHash: true }) ],
    declarations: [
        HomeComponent,
        TodoComponent
    ],
    providers: [
        TodoService,
        MsalService
    ],
    bootstrap: [HomeComponent]
})

export class AppModule {
};
