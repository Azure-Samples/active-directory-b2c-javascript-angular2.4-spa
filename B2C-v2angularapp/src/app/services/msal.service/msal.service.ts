import { Injectable }       from '@angular/core';

declare var bootbox: any;
declare var Msal: any;

@Injectable()
export class MsalService {
    
    access_token: string;

    //These values need to be updated with the specific tenant and its policies.
    applicationConfig = {
        clientID: 'aa4c1c98-f36a-4876-8d0c-d9b48a85fed3',
        authority: "https://login.microsoftonline.com/tfp/stevenzhou.onmicrosoft.com/B2C_1_TestSignInSignUp01",
        b2cScopes: ["https://stevenzhou.onmicrosoft.com/Tasks/read"]
    };
    
    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.applicationConfig.clientID, this.applicationConfig.authority, 
        function (errorDesc: any, token: any, error: any, tokenType: any) {
            // Called after loginRedirect or acquireTokenPopup
        }
    );

    login(): void {
        this.clientApplication.loginPopup(this.applicationConfig.b2cScopes).then(function (idToken: any) {
            this.clientApplication.acquireTokenSilent(this.applicationConfig.b2cScopes).then(
                function (accessToken: any) {
                    this.access_token = accessToken;
                }, function (error: any) {
                    this.clientApplication.acquireTokenPopup(this.applicationConfig.b2cScopes).then(
                        function (accessToken: any) {
                            this.access_token = accessToken;
                        }, function (error: any) {
                            bootbox.alert("Error acquiring the popup:\n" + error);
                        });
                })
        }, function (error: any) {
            bootbox.alert("Error during login:\n" + error);
        });
    }
    
    logout(): void {
        this.clientApplication.logout();
    };

    isOnline(): boolean {
        return this.clientApplication.getUser() != null; 
    };
}