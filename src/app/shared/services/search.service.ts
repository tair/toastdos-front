import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  keywordSearch(keywords: string){
      return this.http
          .get(
              `${environment.base_url}/search/${keywords}`
          );
  }
}
