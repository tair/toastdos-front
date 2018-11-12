import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { GeneService } from 'src/app/shared/services/gene.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";

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
      gene: new FormControl('', [
          Validators.required
      ]),
  });

  @Input () annotationData: any;
  @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

  annotationType: string = "MOLECULAR_FUNCTION";

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

    this.form.valueChanges.subscribe(value => {
        this.setAnnotationData();
    })
  }

  get availableGenes() {
    return this.geneService.enteredGenes$;
  }

  get function() {
      return this.form.get('function');
  }

  get gene() {
      return this.form.get('gene');
  }

  setAnnotationData()
  {
      this.annotationData.data['gene1'] = this.geneService.allGenes().length == 1 ? this.geneService.allGenes()[0] : this.gene.value;
      this.annotationData.data['function'] = this.function.value;
      this.annotationData.data['method'] = this.methodComponent.method;
  }

}
