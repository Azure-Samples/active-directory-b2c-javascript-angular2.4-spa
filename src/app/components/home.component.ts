import { Component }    from '@angular/core';
import { Location }     from '@angular/common';
import { MsalService }  from '../services/msal.service';

@Component({
  templateUrl: './home.html'
})

export class HomeComponent {

    constructor(
      private location: Location,
      private msalService: MsalService
    ){}
}