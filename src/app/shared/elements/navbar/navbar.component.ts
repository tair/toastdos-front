import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/accounts/services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userTypes: number[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.currentUserInfo$.subscribe((user) => {
      this.userTypes = user.roles.map(x => {
        return x.id;
      });

    });
  }


  logout()
  {
    this.authService.logout();
  }

  goToOrcId() {
    window.location.href = 'https://orcid.org/oauth/authorize?' +
      'client_id=APP-L8ISF5DJNGXMS599&' +
      'response_type=code&' +
      'scope=/authenticate&' +
      'redirect_uri=http://0.0.0.0:4200/';
  }

  get user() {
    return this.authService.currentUserInfo$;
  }


  get isLoggedIn() {
    return this.authService.isLoggedIn$;
  }


}
