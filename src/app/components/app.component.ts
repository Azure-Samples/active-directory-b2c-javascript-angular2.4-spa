import { Component, OnInit }    from '@angular/core';
import { Location }     from '@angular/common';
import { MsalService }  from '../services/msal.service';

declare var msal:any;

@Component({
  selector: 'my-app',
  templateUrl: './app.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

    showTodoOption: boolean;

    constructor(
      private location: Location,
      private msalService: MsalService
    ){}

    ngOnInit() {
        this.msalService.IsTodoReady.subscribe(function(result:boolean){
            if(result) {
                console.log(result);
                this.showTodoOption = result;
            }
        }.bind(this));
    }

    login(): void {
        this.msalService.login();
    }
    
    logout(): void {
        this.msalService.logout();
        sessionStorage.clear();
    };

    isActive(viewLocation: any): boolean {        
        return viewLocation === this.location.path();
    };

    isOnline(): boolean {
        return this.msalService.isOnline();
    };

    isTodoReady(): boolean {
        return this.msalService.isOnline();
    };
}