import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export interface Annotation{
    type: string,
    data: {}
}

export interface Gene{
    locusName: string,
    geneSymbol: string,
    fullName: string
}

export interface Submission {
    publicationId: string,
    genes: Array<Gene>,
    annotations: Array<Annotation>
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
    submissions = new BehaviorSubject<any>([]);
    currentSubmission = new BehaviorSubject<Submission>({
      publicationId:'',
      genes : [],
      annotations : []
    }); //defualt blank submission

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

    get currentSubmission$()
    {
      return this.currentSubmission.asObservable();
    }

    setSubmission(newSubmission: Submission)
    {
      this.currentSubmission.next(newSubmission);
    }

}
