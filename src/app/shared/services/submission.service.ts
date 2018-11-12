import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
    submissions = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) {

    }

    getPageOfSubmissions(page,limit) {
      let url = `${environment.base_url}/submission/list?page=${page}&limit=${limit}&sort_by=date&sort_dir=desc`
      this.http.get(url).subscribe(next => {
          console.log(next['inProgress'][0]);
        this.submissions.next(next);
      },error1 => {
        console.log(error1);
      })

    }

}
