import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/share";

declare var bootbox: any;
declare var Msal:any;
@Injectable()
export class MsalService {

    B2CAccessTokenKey = "b2c.access.token.key";
    accessTokenObserver: Observer<boolean>;
    isAccessTokenReady = new Observable<boolean>((observer: Observer<boolean>) => (this.accessTokenObserver = observer)).share();
    accessToken: string;

    tenantConfig = {
        tenant: "fabrikamb2c.onmicrosoft.com",
        clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
        signUpSignInPolicy: "b2c_1_susi",
        b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
    };
    
    // Configure the authority for Azure AD B2C
    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority, 
        function (errorDesc: any, token: any, error: any, tokenType: any) {
            // Called after loginRedirect or acquireTokenPopup
        }
    );

    public login(): void {
        var self = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            self.clientApplication.acquireTokenSilent(self.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    sessionStorage.setItem(self.B2CAccessTokenKey, accessToken);
                    self.updateAccessTokenStatus();
                }, function (error: any) {
                    self.clientApplication.acquireTokenPopup(self.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            sessionStorage.setItem(self.B2CAccessTokenKey, accessToken);
                            self.updateAccessTokenStatus();
                        }, function (error: any) {
                            bootbox.alert("Error acquiring the popup:\n" + error);
                        });
                })
        }, function (error: any) {
            bootbox.alert("Error during login:\n" + error);
        });
    };

    updateAccessTokenStatus(): void{
        if (sessionStorage.hasOwnProperty(this.B2CAccessTokenKey) && sessionStorage[this.B2CAccessTokenKey] !== "") {
            this.accessToken = sessionStorage[this.B2CAccessTokenKey];
            this.accessTokenObserver.next(true);
        } else {
            this.accessTokenObserver.next(false);
        }
    };

    logout(): void {
        this.clientApplication.logout();
    };

    isOnline(): boolean {
        return this.clientApplication.getUser() != null; 
    };
}