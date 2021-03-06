import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import {SubmissionService} from "./submission.service";

@Injectable({
  providedIn: 'root'
})
export class GeneService {

  constructor(private http: HttpClient, private submission: SubmissionService) {

  }

  searchMolecularFunction(function_name: string) {
    return this.http
    .get(
      `${environment.base_url}/keyword/search?substring=${function_name}&keyword_scope=molecular_function`
    );
  }

  searchBiologicalProcess(process_name: string) {
    return this.http
        .get(
            `${environment.base_url}/keyword/search?substring=${process_name}&keyword_scope=biological_process`
        );
  }

  searchSubcellularLocation(location: string) {
      return this.http
          .get(
              `${environment.base_url}/keyword/search?substring=${location}&keyword_scope=cellular_component`
          );
  }

  searchAnatomicalLocation(location: string) {
      return this.http
          .get(
              `${environment.base_url}/keyword/search?substring=${location}&keyword_scope=plant_anatomy`
          );
  }

  searchTemporalExpression(location: string) {
      return this.http
          .get(
              `${environment.base_url}/keyword/search?substring=${location}&keyword_scope=plant_structure_development_stage`
          );
  }

  searchMethods(method_name: string, annotation_type: string) {
    return this.http
    .get(
      `${environment.base_url}/keyword/search?substring=${method_name}&keyword_scope=eco&annotation_type=${annotation_type}`
    );
  }

  checkLocus$(locus: string) {
    return this.http.get(`${environment.base_url}/gene/verify/${locus}`);
  }

}
