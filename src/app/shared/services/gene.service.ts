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

  searchMethods(method_name: string) {
    return this.http
    .get(
      `${environment.base_url}/keyword/search?substring=${method_name}&keyword_scope=eco&annotation_type=MOLECULAR_FUNCTION`
    );
  }

  checkLocus$(locus: string) {
    return this.http.get(`${environment.base_url}/gene/verify/${locus}`);
  }

  addEnteredGene(gene: any) {
    const temp = this.enteredGenes.value;
    temp.push(gene);
    this.enteredGenes.next(temp);
  }

  removeEnteredGene(gene: any) {
    this.enteredGenes.next(this.enteredGenes.value.filter(locus => locus.locus_name !== gene.locus_name));
  }

  get enteredGenes$(): Observable<any[]> {
    return this.enteredGenes.asObservable();
  }

}
