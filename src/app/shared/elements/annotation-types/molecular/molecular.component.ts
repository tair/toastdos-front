import { Component, OnInit } from '@angular/core';
import { GeneService } from 'src/app/shared/services/gene.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-molecular',
  templateUrl: './molecular.component.html',
  styleUrls: ['./molecular.component.scss']
})
export class MolecularComponent implements OnInit {

  form: FormGroup = new FormGroup({
    function: new FormControl('', [
      Validators.required
    ]),
    method: new FormControl('', [
      Validators.required
    ])
  });

  goFunctions: any;
  goFormatter = (x: any) => x.name;

  constructor(private geneService: GeneService) { }

  ngOnInit() {
    this.goFunctions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.geneService.searchMolecularFunction(term))
      );
  }

  get availableGenes() {
    return this.geneService.enteredGenes$;
  }

  get function() {
    return this.form.get('function');
  }

  get method() {
    return this.form.get('method');
  }

}
