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
var todo_service_1 = require('../services/todo.service');
var hello = require('../../../lib/hello.all.js');
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'todo', component: todo_component_1.TodoComponent }
];
var AppModule = (function () {
    function AppModule() {
        //These values need to be updated with the specific tenant and its policies.
        this.tenantName = "stevenzhou.onmicrosoft.com";
        this.signInSignUpPolicyName = "B2C_1_TestSignInSignUp01";
        this.post_login_redirect_uri = "http://localhost:3000/redirect.html";
        this.post_logout_redirect_uri = "http://localhost:3000";
        this.applicationId = 'aa4c1c98-f36a-4876-8d0c-d9b48a85fed3';
        /*
         * B2C SignIn SignUp Policy Configuration
         */
        this.aadb2cObj = hello.aadb2c.init(this.tenantName, this.applicationId, this.signInSignUpPolicyName, this.post_login_redirect_uri, this.post_logout_redirect_uri);
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
                todo_service_1.TodoService
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