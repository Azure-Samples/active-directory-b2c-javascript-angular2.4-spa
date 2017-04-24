'use strict';
angular.module('todoApp')
.controller('todoListCtrl', ['$scope', '$location', 'todoListSvc', 'hello', function ($scope, $location, todoListSvc, hello) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.todoList = null;
    $scope.editingInProgress = false;
    $scope.newTodoCaption = "";
    $scope.authResponse = hello('adB2CSignInSignUp').getAuthResponse();
    $scope.baseId = 0;

    $scope.editInProgressTodo = {
        Text: "",
        Id: 0
    };

    $scope.editSwitch = function (todo) {
        todo.edit = !todo.edit;
        if (todo.edit) {
            $scope.editInProgressTodo.Text = todo.Text;
            $scope.editInProgressTodo.Id = todo.Id;
            $scope.editingInProgress = true;
        } else {
            $scope.editingInProgress = false;
        }
    };

    $scope.populate = function () {
        var config = { headers: { Authorization: $scope.authResponse.token_type + ' ' + $scope.authResponse.access_token } };
        todoListSvc.getItems(config).then(function (results) {
            $scope.todoList = results.data;
            $scope.loadingMessage = "";
        }, function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        });
    };

    $scope.delete = function (id) {
        var config = { headers: { Authorization: $scope.authResponse.token_type + ' ' + $scope.authResponse.access_token } };
        todoListSvc.deleteItem(id, config).then(function (results) {
            $scope.loadingMessage = "";
            $scope.populate();
        }, function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        });
    };

    $scope.update = function (todo) {
        var config = { headers: { Authorization: $scope.authResponse.token_type + ' ' + $scope.authResponse.access_token } };
        todoListSvc.putItem($scope.editInProgressTodo, config).then(function (results) {
            $scope.loadingMsg = "";
            $scope.populate();
            $scope.editSwitch(todo);
        }), function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        }
    };

    $scope.add = function () {
        var config = { headers: { Authorization: $scope.authResponse.token_type + ' ' + $scope.authResponse.access_token } };
        todoListSvc.postItem({
            'Id': $scope.baseId,
            'Text': $scope.newTodoCaption,
            'Owner': 'CurrentUser'
        }, config).then(function (results) {
            $scope.loadingMsg = "";
            $scope.newTodoCaption = "";
            $scope.baseId += 1;
            $scope.populate();
        }, function (err) {
            $scope.error = err;
            $scope.loadingMsg = "";
        });
    };
}]);