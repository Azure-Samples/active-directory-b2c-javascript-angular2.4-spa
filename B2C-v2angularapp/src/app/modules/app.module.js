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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_component_1 = require('../components/app.component/app.component');
var todo_component_1 = require('../components/todo.component/todo.component');
var home_component_1 = require('../components/home.component/home.component');
var todo_service_1 = require('../services/todo.service/todo.service');
var msal_service_1 = require('../services/msal.service/msal.service');
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'todo', component: todo_component_1.TodoComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes, { useHash: true })],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                todo_component_1.TodoComponent
            ],
            providers: [
                todo_service_1.TodoService,
                msal_service_1.MsalService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
;
//# sourceMappingURL=app.module.js.map