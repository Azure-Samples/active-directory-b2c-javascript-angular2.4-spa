import { Component }    from '@angular/core';
import { Location }     from '@angular/common';
import { MsalService }  from '../../services/msal.service/msal.service';

@Component({
  selector: 'todo-app',
  templateUrl: './app.html',
  styleUrls: ['./app.component.css'],
  providers: [MsalService]
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
    };

    isActive(viewLocation: any): boolean {        
        return viewLocation === this.location.path();
    };

    isOnline(): boolean {
        return this.msalService.isOnline();
    };
}