import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/accounts/services/authentication.service';
import {GoatConstants} from "../../utils";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // userType:any = GoatConstants.userTypeResearcher;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

  }

  logout()
  {
    this.authService.logout();
  }

  goToOrcId() {
    window.location.href = 'https://orcid.org/oauth/authorize?' +
      'client_id=APP-ZWMPV0URGJH6YO7I&' +
      'response_type=code&' +
      'scope=/authenticate&' +
      'redirect_uri=http://localhost:4200/';
  }

  get user()
  {
    return this.authService.currentUserInfo$;
  }


  get isLoggedIn() {
    return this.authService.isLoggedIn$;
  }


}
