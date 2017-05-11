import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { NgModule }		        from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from '../components/app.component/app.component';
import { TodoComponent }        from '../components/todo.component/todo.component';
import { HomeComponent }        from '../components/home.component/home.component';
import { TodoService }          from '../services/todo.service';

declare function require(name: string) : any;
var hello = require('../../../lib/hello.all.js');

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'todo', component: TodoComponent }
];

@NgModule({
    imports: [ FormsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes, { useHash: true }) ],
    declarations: [
        AppComponent,
        HomeComponent,
        TodoComponent
    ],
    providers: [
        TodoService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
   
    //These values need to be updated with the specific tenant and its policies.
    private tenantName: string = "stevenzhou.onmicrosoft.com";
    private signInSignUpPolicyName: string = "B2C_1_TestSignInSignUp01";
    private post_login_redirect_uri: string = "http://localhost:3002/redirect.html";
    private post_logout_redirect_uri: string = "http://localhost:3002";
    private applicationId: string = 'aa4c1c98-f36a-4876-8d0c-d9b48a85fed3';
    
    /*
     * B2C SignIn SignUp Policy Configuration
     */
    aadb2cObj: any = hello.aadb2c.init(
        this.tenantName, 
        this.applicationId, 
        this.signInSignUpPolicyName, 
        this.post_login_redirect_uri,
        this.post_logout_redirect_uri
    );
};
