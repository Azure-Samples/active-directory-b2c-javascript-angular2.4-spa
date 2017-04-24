'use strict';
angular.module('todoApp')
.controller('homeCtrl', ['$scope', 'hello', '$location', function ($scope, hello, $location) {
    //applicaionID created in AD B2C portal
    var applicationId = 'aa4c1c98-f36a-4876-8d0c-d9b48a85fed3';

    //initiate all policies
    hello.init({
        adB2CSignInSignUp: applicationId
    }, {
        redirect_uri: '../redirect.html',
        scope: 'openid ' + applicationId,
        response_type: 'token id_token'
    });

    $scope.login = function () {
        hello('adB2CSignInSignUp').login({ display: 'page' }).then(function (auth) {
        }, function (e) {
            bootbox.alert('Signin error: ' + e.error.message);
        });
    };
    
    $scope.logout = function () {
        hello.logout('adB2CSignInSignUp', { force: true }).then(function (auth) {
            bootbox.alert('You are logging out from AD B2C');
        }, function (e) {
            bootbox.alert('Logout error: ' + e.error.message);
        });
    };

    $scope.isActive = function (viewLocation) {        
        return viewLocation === $location.path();
    };

    $scope.isOnline = function () {
        var currentTime = (new Date()).getTime() / 1000;
        var session = hello('adB2CSignInSignUp').getAuthResponse();
        return session && session.access_token && session.expires > currentTime;
    };
}]);