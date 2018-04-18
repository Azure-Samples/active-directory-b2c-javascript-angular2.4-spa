import { Component, OnInit }   from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MsalService}  from '../services/msal.service';

@Component({
    templateUrl: './todo.html',
	providers: [TodoService]
})

export class TodoComponent implements OnInit{

	access_token: string;

	error = "";
	loadingMessage = "Loading...";
	todoItems: Array<String> = [];
	newTodoCaption = "";
	baseId = 0;

    constructor(
     	private todoListService: TodoService,
		private msalService: MsalService
    ){}

	ngOnInit() {
		if(this.getAccessTokenFromCache()) {
			this.populate();
		}
	};

	getAccessTokenFromCache(): boolean {
		if (sessionStorage.hasOwnProperty(this.msalService.B2CTodoAccessTokenKey) && sessionStorage[this.msalService.B2CTodoAccessTokenKey] !== "") {
			this.access_token = sessionStorage[this.msalService.B2CTodoAccessTokenKey];
			return true;
		} else {
			throw "Access token does not exist for todo app.";
		}
	};

    populate(): void {
		var _this = this;
		let config = { headers: { Authorization: 'Bearer ' + this.access_token } };
		this.todoListService.getItems(config).subscribe(function (results: any) {
			_this.todoItems = JSON.parse(results._body);
			_this.loadingMessage = "";
		}, function (err: any) {
			_this.error = err;
			_this.loadingMessage = "";
		});
    };

    delete(id: number): void {
		var _this = this;
		let config = { headers: { Authorization: 'Bearer' + ' ' + this.access_token } };
		this.todoListService.deleteItem(id, config).subscribe(function () {
			_this.loadingMessage = "";
			_this.populate();
		}, function (err: any) {
			_this.error = err;
			_this.loadingMessage = "";
		});
    };

    add(): void {
		var _this = this;
		let config = { headers: { Authorization: 'Bearer' + ' ' + this.access_token } };
		this.todoListService.postItem({
			'Id': _this.baseId,
			'Text': _this.newTodoCaption,
			'Owner': 'CurrentUser'
		}, config).subscribe(function () {
			_this.loadingMessage = "";
			_this.newTodoCaption = "";
			_this.baseId += 1;
			_this.populate();
		}, function (err: any) {
			_this.error = err;
			_this.loadingMessage = "";
		});
     };
}
