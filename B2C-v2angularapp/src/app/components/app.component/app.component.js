"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var hello = require('../../../lib/hello.all.js');
var AppComponent = (function () {
    function AppComponent(location) {
        this.location = location;
    }
    AppComponent.prototype.login = function () {
        hello(hello.aadb2c.policyName).login({ display: 'page' }).then(function (auth) {
        }, function (e) {
            bootbox.alert('Signin error: ' + e.error.message);
        });
    };
    ;
    AppComponent.prototype.logout = function () {
        hello.logout(hello.aadb2c.policyName, { force: true }).then(function (auth) {
            bootbox.alert('You are logging out from AD B2C');
        }, function (e) {
            bootbox.alert('Logout error: ' + e.error.message);
        });
    };
    ;
    AppComponent.prototype.isActive = function (viewLocation) {
        return viewLocation === this.location.path();
    };
    ;
    AppComponent.prototype.isOnline = function () {
        var currentTime = (new Date()).getTime() / 1000;
        var session = hello(hello.aadb2c.policyName).getAuthResponse();
        return session && session.access_token && session.expires > currentTime;
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            selector: 'todo-app',
            templateUrl: './app.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map