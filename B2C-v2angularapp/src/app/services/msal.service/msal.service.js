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
var MsalService = (function () {
    function MsalService() {
        //These values need to be updated with the specific tenant and its policies.
        this.applicationConfig = {
            clientID: 'aa4c1c98-f36a-4876-8d0c-d9b48a85fed3',
            authority: "https://login.microsoftonline.com/tfp/stevenzhou.onmicrosoft.com/B2C_1_TestSignInSignUp01",
            b2cScopes: ["https://stevenzhou.onmicrosoft.com/Tasks/read"]
        };
        /*
         * B2C SignIn SignUp Policy Configuration
         */
        this.clientApplication = new Msal.UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authority, function (errorDesc, token, error, tokenType) {
            // Called after loginRedirect or acquireTokenPopup
        });
    }
    MsalService.prototype.login = function () {
        this.clientApplication.loginPopup(this.applicationConfig.b2cScopes).then(function (idToken) {
            this.id_token = idToken;
            this.clientApplication.acquireTokenSilent(this.applicationConfig.b2cScopes).then(function (accessToken) {
                this.access_token = accessToken;
            }, function (error) {
                this.clientApplication.acquireTokenPopup(this.applicationConfig.b2cScopes).then(function (accessToken) {
                    this.access_token = accessToken;
                }, function (error) {
                    bootbox.alert("Error acquiring the popup:\n" + error);
                });
            });
        }, function (error) {
            bootbox.alert("Error during login:\n" + error);
        });
    };
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
//# sourceMappingURL=msal.service.js.map