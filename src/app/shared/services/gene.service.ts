import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeneService {

  constructor(private http: HttpClient) {

  }

  checkLocus$(locus: string) {
    return this.http.get(`${environment.base_url}/gene/verify/${locus}`)
  }


}
