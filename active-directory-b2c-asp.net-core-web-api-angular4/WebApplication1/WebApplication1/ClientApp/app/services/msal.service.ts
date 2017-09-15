import { Injectable,OnInit } from '@angular/core';

    declare var bootbox: any;
    declare var Msal: any;

@Injectable()
export class MsalService {

    access_token: string;
    clientApplication : any;
    tenantConfig = {
        tenant: "KopB2Ctest.onmicrosoft.com",
        clientID: '0fc2918c-8869-4a20-a785-12d176eecd80',
        signUpSignInPolicy: "B2C_1_MailRegister",
        b2cScopes: ["openid"]
    };

    // Configure the authority for Azure AD B2C

    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    public constructor()
    {
        try {
            this.clientApplication = new Msal.UserAgentApplication(
                this.tenantConfig.clientID, this.authority,
                function (errorDesc: any, token: any, error: any, tokenType: any) {
                    // Called after loginRedirect or acquireTokenPopup
                }
            );
            this.clientApplication.redirectUri = "http://localhost:62189";
        } catch (ex)
        {}
    }

    

    public login(): void {
        try {
            var _this = this;
            this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
                _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                    function (accessToken: any) {
                        _this.access_token = accessToken;
                    }, function (error: any) {
                        _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                            function (accessToken: any) {
                                _this.access_token = accessToken;
                            }, function (error: any) {
                                bootbox.alert("Error acquiring the popup:\n" + error);
                            });
                    })
            }, function (error: any) {
                bootbox.alert("Error during login:\n" + error);
            });
        }
        catch (ex)
        {

        }
    }

    logout(): void {
        try {
            this.clientApplication.logout();
        } catch (ex)
        {}
    };

    isOnline(): boolean {
        try {
            return this.clientApplication.getUser() != null;
        } catch (ex)
        {

        }
        return false;
    };
}