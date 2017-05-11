import { Component } from '@angular/core';
import { Location }  from '@angular/common';

declare var bootbox: any;
declare function require(name: string) : any;
var hello = require('../../../lib/hello.all.js');

@Component({
  selector: 'todo-app',
  templateUrl: './app.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    constructor(
      private location: Location
    ){}

    login(): void {
        hello(hello.aadb2c.policyName).login({ display: 'page' }).then(function (auth: any) {
        }, function (e: any) {
            bootbox.alert('Signin error: ' + e.error.message);
        });
    };
    
    logout(): void {
        hello.logout(hello.aadb2c.policyName, { force: true }).then(function (auth: any) {
            bootbox.alert('You are logging out from AD B2C');
        }, function (e: any) {
            bootbox.alert('Logout error: ' + e.error.message);
        });
    };

    isActive(viewLocation: any): boolean {        
        return viewLocation === this.location.path();
    };

    isOnline(): boolean {
        let currentTime = (new Date()).getTime() / 1000;
        let session = hello(hello.aadb2c.policyName).getAuthResponse();
        return session && session.access_token && session.expires > currentTime;
    };
}