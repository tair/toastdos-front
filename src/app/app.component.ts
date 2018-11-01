import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './accounts/services/authentication.service';
import { switchMap, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.router.events
    .pipe(
      take(1),
      filter((event: NavigationEnd) => event.url.includes('code')),
      switchMap((event: NavigationEnd) => {
        const code = event.url.split('code=')[1];
        return this.authService.login(code);
      })
    )
    .subscribe((result: any) => {
      console.log(result);
      this.router.navigate(['/']);
    });
  }
}
