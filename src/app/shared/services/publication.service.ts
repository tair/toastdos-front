import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) {

  }

  checkIsValid$(pubId: string)
  {
    return this.http
      .post(
        `${environment.base_url}/publication`,
        {publication_id: pubId}
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
  }
}
