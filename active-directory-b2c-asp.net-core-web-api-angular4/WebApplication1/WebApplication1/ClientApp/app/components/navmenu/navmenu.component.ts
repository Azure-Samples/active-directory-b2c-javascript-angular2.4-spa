import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MsalService } from '../../services/msal.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [MsalService]
})
export class NavMenuComponent {
    constructor(
        private location: Location,
        private msalService: MsalService
    ) { }

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
