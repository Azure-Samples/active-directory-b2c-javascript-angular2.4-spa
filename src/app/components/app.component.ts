import { Component }    from '@angular/core';
import { Location }     from '@angular/common';
import { MsalService }  from '../services/msal.service';

declare var msal:any;

@Component({
  selector: 'my-app',
  templateUrl: './app.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

    constructor(
      private location: Location,
      private msalService: MsalService
    ){}

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
}