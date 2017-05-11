import { Component }   from '@angular/core';
import { TodoService } from '../../services/todo.service';

declare function require(name: string) : any;
var hello = require('../../../lib/hello.all.js');

@Component({
    selector: 'todo-list',
    templateUrl: './todo.html',
	providers: [TodoService]
})

export class TodoComponent {
	error = "";
	loadingMessage = "Loading...";
	todoItems: Array<String> = [];
	editingInProgress = false;
	newTodoCaption = "";
	authResponse = hello('adB2CSignInSignUp').getAuthResponse();
	baseId = 0;

    constructor(
     	private todoListService: TodoService
    ){}

    populate(): void {
		let config = { headers: { Authorization: this.authResponse.token_type + ' ' + this.authResponse.access_token } };
		this.todoListService.getItems(config).then(function (results: {data: Array<Number>}) {
			this.todoItems = results.data;
			this.loadingMessage = "";
		}, function (err: any) {
			this.error = err;
			this.loadingMessage = "";
		});
    };

    delete(id: number): void {
		let config = { headers: { Authorization: this.authResponse.token_type + ' ' + this.authResponse.access_token } };
		this.todoListService.deleteItem(id, config).then(function () {
			this.loadingMessage = "";
			this.populate();
		}, function (err: any) {
			this.error = err;
			this.loadingMessage = "";
		});
    };

    add(): void {
		let config = { headers: { Authorization: this.authResponse.token_type + ' ' + this.authResponse.access_token } };
		this.todoListService.postItem({
			'Id': this.baseId,
			'Text': this.newTodoCaption,
			'Owner': 'CurrentUser'
		}, config).then(function () {
			this.loadingMsg = "";
			this.newTodoCaption = "";
			this.baseId += 1;
			this.populate();
		}, function (err: any) {
			this.error = err;
			this.loadingMsg = "";
		});
     };
}
