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
var msal_service_1 = require('../services/msal.service');
var AppComponent = (function () {
    function AppComponent(location, msalService) {
        this.location = location;
        this.msalService = msalService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.msalService.IsTodoReady.subscribe(function (result) {
            if (result) {
                console.log(result);
                this.showTodoOption = result;
            }
        }.bind(this));
    };
    AppComponent.prototype.login = function () {
        this.msalService.login();
    };
    AppComponent.prototype.logout = function () {
        this.msalService.logout();
        sessionStorage.clear();
    };
    ;
    AppComponent.prototype.isActive = function (viewLocation) {
        return viewLocation === this.location.path();
    };
    ;
    AppComponent.prototype.isOnline = function () {
        return this.msalService.isOnline();
    };
    ;
    AppComponent.prototype.isTodoReady = function () {
        return this.msalService.isOnline();
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.html',
            styleUrls: ['./app.component.css'],
        }), 
        __metadata('design:paramtypes', [common_1.Location, msal_service_1.MsalService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
