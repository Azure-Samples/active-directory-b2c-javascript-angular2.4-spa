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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
var MsalService = (function () {
    function MsalService() {
        var _this = this;
        this.B2CTodoAccessTokenKey = "b2c.todo.access.token";
        this.IsTodoReady = new Observable_1.Observable(function (observer) { return (_this.observer = observer); });
        this.tenantConfig = {
            tenant: "fabrikamb2c.onmicrosoft.com",
            clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
            signUpSignInPolicy: "b2c_1_susi",
            b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
        };
        // Configure the authority for Azure AD B2C
        this.authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;
        /*
         * B2C SignIn SignUp Policy Configuration
         */
        this.clientApplication = new Msal.UserAgentApplication(this.tenantConfig.clientID, this.authority, function (errorDesc, token, error, tokenType) {
            // Called after loginRedirect or acquireTokenPopup
        });
    }
    MsalService.prototype.login = function () {
        var self = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken) {
            self.clientApplication.acquireTokenSilent(self.tenantConfig.b2cScopes).then(function (accessToken) {
                sessionStorage.setItem(self.B2CTodoAccessTokenKey, accessToken);
                self.observer.next(true);
            }, function (error) {
                self.clientApplication.acquireTokenPopup(self.tenantConfig.b2cScopes).then(function (accessToken) {
                    sessionStorage.setItem(self.B2CTodoAccessTokenKey, accessToken);
                    self.observer.next(true);
                }, function (error) {
                    bootbox.alert("Error acquiring the popup:\n" + error);
                });
            });
        }, function (error) {
            bootbox.alert("Error during login:\n" + error);
        });
    };
    ;
    MsalService.prototype.logout = function () {
        this.clientApplication.logout();
    };
    ;
    MsalService.prototype.isOnline = function () {
        return this.clientApplication.getUser() != null;
    };
    ;
    MsalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MsalService);
    return MsalService;
}());
exports.MsalService = MsalService;
