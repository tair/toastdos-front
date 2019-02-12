import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GoatConstants} from "../../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper = new JwtHelperService();
  private _loggedIn = new BehaviorSubject<boolean>(false);
  private _gotUserData = false;
  private _currentUserInfo = new BehaviorSubject<any>({roles:[{'id':2}]}); //default value for user type

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.getUserInfo();
      this._loggedIn.next(true);
    }
  }

  login(authCode: string): Observable<any> {
    return this.http.post(
      `${environment.base_url}/login`,
      {code: authCode},
    )
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.jwt);
        this.getUserInfo();
        this._loggedIn.next(true);
      })
    );
  }

  logout() {
    this._loggedIn.next(false);
    localStorage.removeItem('token');
  }

  getUserInfo()
  {
    if (!this._gotUserData) {
      this._gotUserData = true;
      this.http.get(`${environment.base_url}/user/${this.tokenPayload.user_id}/?withRelated=roles`).subscribe(
        response => {
          this._currentUserInfo.next(response);
        }
      );
    }
  }

  get isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  get userID() {
    return this.tokenPayload.user_id;
  }

  get currentUserInfo$(){
    return this._currentUserInfo.asObservable();
  }


  get tokenPayload() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  get isLoggedIn$() {
    return this._loggedIn.asObservable();
  }

}
