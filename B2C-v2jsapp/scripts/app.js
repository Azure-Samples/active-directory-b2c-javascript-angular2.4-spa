'use strict';
angular.module('todoApp', ['ngRoute','ngHello'])
.config(['$routeProvider', '$httpProvider', 'helloProvider', function ($routeProvider, $httpProvider, helloProvider) {
    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/views/Home.html"
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/views/TodoList.html"
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/views/UserData.html"
    }).otherwise({ redirectTo: "/Home" });

    //These values need to be updated with the specific tenant and its policies.
    var tenantName = "stevenzhou.onmicrosoft.com";
    var signInSignUpPolicyName = "B2C_1_TestSignInSignUp01";
    var redirect_uri = "http://localhost:65328/";

    //No need to modify the below values
    var helloJsSignInSignUpPolicy = "adB2CSignInSignUp";

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    helloProvider.init({
        adB2CSignInSignUp: {
            name: 'Azure Active Directory B2C',
            oauth: {
                version: 2,
                auth: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + signInSignUpPolicyName + "/oauth2/v2.0/authorize",
                grant: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + signInSignUpPolicyName + "/oauth2/v2.0/token"
            },
            refresh: true,
            scope_delim: ' ',
            logout: function () {
                //get id_token from auth response
                var id_token = hello(helloJsSignInSignUpPolicy).getAuthResponse().id_token;
                //clearing local storage session
                hello.utils.store(helloJsSignInSignUpPolicy, null);

                //redirecting to Azure B2C logout URI
                window.location = "https://login.microsoftonline.com/" + tenantName + "/oauth2/v2.0/logout?p=" + signInSignUpPolicyName + "&id_token_hint=" +
                        id_token + "&post_logout_redirect_uri=" + redirect_uri;
            },
            xhr: function (p) {
                if (p.method === 'post' || p.method === 'put') {
                    //toJSON(p);
                    if (typeof (p.data) === 'object') {
                        // Convert the POST into a javascript object
                        try {
                            p.data = JSON.stringify(p.data);
                            p.headers['content-type'] = 'application/json';
                        } catch (e) { }
                    }
                } else if (p.method === 'patch') {
                    hello.utils.extend(p.query, p.data);
                    p.data = null;
                }
                return true;
            },
            // Don't even try submitting via form.
            // This means no POST operations in <=IE9
            form: false
        }
    });

}]);
