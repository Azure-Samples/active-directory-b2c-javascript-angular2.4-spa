import { Injectable }       from '@angular/core';

declare var bootbox: any;
declare var Msal: any;

@Injectable()
export class MsalService {
    
    access_token: string;

    tenantConfig = {
        tenant: "fabrikamb2c.onmicrosoft.com",
        clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
        signUpSignInPolicy: "b2c_1_susi",
        b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
    };
    
    // Configure the authority for Azure AD B2C

    authority = "https://login.microsoft.online.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority, 
        function (errorDesc: any, token: any, error: any, tokenType: any) {
            // Called after loginRedirect or acquireTokenPopup
        }
    );

    login(): void {
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
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