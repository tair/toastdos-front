import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/accounts/services/authentication.service';
import { environment} from "../../../../environments/environment";


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
        window.location.href = environment.orcidID}

  get user() {
    return this.authService.currentUserInfo$;
  }


  get isLoggedIn() {
    return this.authService.isLoggedIn$;
  }


}
