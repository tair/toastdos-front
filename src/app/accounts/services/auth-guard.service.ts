import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
    public auth: AuthenticationService,
    public router: Router
    ) {}
    canActivate(): boolean {
    if (!this.auth.isLoggedIn) {
        localStorage.removeItem('token');
        window.location.href = environment.orcidID;
        return false;
    }
    return true;
    }
}
