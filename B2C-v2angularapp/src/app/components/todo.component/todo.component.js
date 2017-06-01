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
var todo_service_1 = require('../../services/todo.service');
var hello = require('../../../lib/hello.all.js');
var TodoComponent = (function () {
    function TodoComponent(todoListService) {
        this.todoListService = todoListService;
        this.error = "";
        this.loadingMessage = "Loading...";
        this.todoItems = [];
        this.newTodoCaption = "";
        this.authResponse = hello('adB2CSignInSignUp').getAuthResponse();
        this.baseId = 0;
    }
    TodoComponent.prototype.populate = function () {
        var config = { headers: { Authorization: this.authResponse.token_type + ' ' + this.authResponse.access_token } };
        this.todoListService.getItems(config).then(function (results) {
            this.todoItems = results.data;
            this.loadingMessage = "";
        }, function (err) {
            this.error = err;
            this.loadingMessage = "";
        });
    };
    ;
    TodoComponent.prototype.delete = function (id) {
        var config = { headers: { Authorization: this.authResponse.token_type + ' ' + this.authResponse.access_token } };
        this.todoListService.deleteItem(id, config).then(function () {
            this.loadingMessage = "";
            this.populate();
        }, function (err) {
            this.error = err;
            this.loadingMessage = "";
        });
    };
    ;
    TodoComponent.prototype.add = function () {
        var config = { headers: { Authorization: this.authResponse.token_type + ' ' + this.authResponse.access_token } };
        this.todoListService.postItem({
            'Id': this.baseId,
            'Text': this.newTodoCaption,
            'Owner': 'CurrentUser'
        }, config).then(function () {
            this.loadingMsg = "";
            this.newTodoCaption = "";
            this.baseId += 1;
            this.populate();
        }, function (err) {
            this.error = err;
            this.loadingMsg = "";
        });
    };
    ;
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'todo-list',
            templateUrl: './todo.html',
            providers: [todo_service_1.TodoService]
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map