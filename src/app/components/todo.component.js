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
var todo_service_1 = require('../services/todo.service');
var msal_service_1 = require('../services/msal.service');
var TodoComponent = (function () {
    function TodoComponent(todoListService, msalService) {
        this.todoListService = todoListService;
        this.msalService = msalService;
        this.error = "";
        this.loadingMessage = "Loading...";
        this.todoItems = [];
        this.newTodoCaption = "";
        this.baseId = 0;
    }
    TodoComponent.prototype.ngOnInit = function () {
        this.msalService.IsTodoReady.subscribe(function (result) {
            if (result) {
                this.getAccessTokenFromCache();
                this.populate();
            }
        }.bind(this));
    };
    ;
    TodoComponent.prototype.getAccessTokenFromCache = function () {
        if (sessionStorage.hasOwnProperty(this.msalService.B2CTodoAccessTokenKey) && sessionStorage[this.msalService.B2CTodoAccessTokenKey] !== "") {
            this.access_token = sessionStorage[this.msalService.B2CTodoAccessTokenKey];
            return true;
        }
        return false;
    };
    ;
    TodoComponent.prototype.populate = function () {
        var _this = this;
        if (this.access_token === undefined)
            return;
        var config = { headers: { Authorization: 'Bearer ' + this.access_token } };
        this.todoListService.getItems(config).subscribe(function (results) {
            _this.todoItems = JSON.parse(results._body);
            _this.loadingMessage = "";
        }, function (err) {
            _this.error = err;
            _this.loadingMessage = "";
        });
    };
    ;
    TodoComponent.prototype.delete = function (id, event) {
        var _this = this;
        var config = { headers: { Authorization: 'Bearer' + ' ' + this.access_token } };
        this.todoListService.deleteItem(id, config).subscribe(function () {
            _this.loadingMessage = "";
            _this.populate();
        }, function (err) {
            _this.error = err;
            _this.loadingMessage = "";
        });
        event.stopPropagation();
    };
    ;
    TodoComponent.prototype.add = function (event) {
        var _this = this;
        var config = { headers: { Authorization: 'Bearer' + ' ' + this.access_token } };
        this.todoListService.postItem({
            'Id': _this.baseId,
            'Text': _this.newTodoCaption,
            'Owner': 'CurrentUser'
        }, config).subscribe(function () {
            _this.loadingMessage = "";
            _this.newTodoCaption = "";
            _this.baseId += 1;
            _this.populate();
        }, function (err) {
            _this.error = err;
            _this.loadingMessage = "";
        });
        event.stopPropagation();
    };
    ;
    TodoComponent = __decorate([
        core_1.Component({
            templateUrl: './todo.html',
            providers: [todo_service_1.TodoService]
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService, msal_service_1.MsalService])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
