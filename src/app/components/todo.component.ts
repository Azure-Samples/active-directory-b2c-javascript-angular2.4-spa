import { Component, OnInit }   from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MsalService}  from '../services/msal.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './todo.html',
	providers: [TodoService]
})

export class TodoComponent implements OnInit{

	isTodoReady = false;

	error = "";
	loadingMessage = "Loading...";
	todoItems: Array<String> = [];
	newTodoCaption = "";
	baseId = 0;

    constructor(
     	private todoListService: TodoService,
		private msalService: MsalService,
		private router: Router
    ){}

	ngOnInit() {
		// Order matters here as this one has to be called first so that the observer can be initialzied and ready to use in the function below.
		this.msalService.isAccessTokenReady.subscribe(function(result:boolean){
            if(result) {
				this.populate();
            } else {
				this.loadingMessage = "Sorry. You don't have access. Please login! :)"
			}
        }.bind(this));
		this.msalService.updateAccessTokenStatus();
	};

    populate(): void {
		var _this = this;
		let config = { headers: { Authorization: 'Bearer ' + this.msalService.accessToken } };
		this.todoListService.getItems(config).subscribe(function (results: any) {
			_this.todoItems = JSON.parse(results._body);
			_this.loadingMessage = "";
			_this.isTodoReady = true;
		}, function (err: any) {
			_this.error = err;
			_this.loadingMessage = "";
		});
    };

    delete(id: number, event: any): void {
		var _this = this;
		let config = { headers: { Authorization: 'Bearer' + ' ' + this.msalService.accessToken } };
		this.todoListService.deleteItem(id, config).subscribe(function () {
			_this.loadingMessage = "";
			_this.populate();
		}, function (err: any) {
			_this.error = err;
			_this.loadingMessage = "";
		});
		event.stopPropagation();
    };

    add(event: any): void {
		var _this = this;
		let config = { headers: { Authorization: 'Bearer' + ' ' + this.msalService.accessToken } };
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
		// Looks like the child component event would propagate to parent where parent component will also trigger the click for another time.
		// This should prevent it from happening and ensure only one click would happen which is as expected.
		event.stopPropagation();
     };
}
