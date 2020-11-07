import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Submission } from './submission.service';
import { Observable } from 'rxjs';
import { SubmissionComponent } from '../pages/submission/submission.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurationDetailResolverService implements Resolve<Submission> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<Submission> | Promise<Submission> | Submission {
    const id = route.params.id;
    const url = `${environment.base_url}/submission/${id}`;
    return this.http.get<Submission>(url);
  };
}
