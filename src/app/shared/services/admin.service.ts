import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private _currentUserInfo = new BehaviorSubject<any>({roles:[{'id':2}]});

    constructor(private http: HttpClient) {

    }

    get allUserData$()
    {
      return this.http.get(`${environment.base_url}/user/`);

    }

    addUserRole$(user,roleId)
    {
        return this.http.patch(`${environment.base_url}/user/${user.id}/roles`,
            {
                'add':roleId
            });
    }

    removeUserRole$(user,roleId)
    {
        return this.http.patch(`${environment.base_url}/user/${user.id}/roles`,
            {
                'remove':roleId
            });
    }

    getUserRoles$(user)
    {
        return this.http.get(`${environment.base_url}/user/${user.id}/?withRelated=roles`);
    }
}