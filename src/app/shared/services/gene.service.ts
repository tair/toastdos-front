import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneService {

  private enteredGenes: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

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

  addEnteredGene(gene: any) {
    console.log(gene);
    let next = [gene];
    for (let x of this.enteredGenes.value)
    {
      if (x.locus_name !== gene.locus_name)
      {
        next.push(x);
      }
    }
    this.enteredGenes.next(next);
  }

  removeEnteredGene(gene: any) {
    if (gene != null) {
        this.enteredGenes.next(this.enteredGenes.value.filter(locus => locus.locus_name !== gene.locus_name));
    }
  }

  allGenes()
  {
    return this.enteredGenes.getValue();
  }

  get enteredGenes$(): Observable<any[]> {
    return this.enteredGenes.asObservable();
  }

}
