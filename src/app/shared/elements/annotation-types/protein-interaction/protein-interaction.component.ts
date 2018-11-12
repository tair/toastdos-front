import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-protein-interaction',
  templateUrl: './protein-interaction.component.html',
  styleUrls: ['./protein-interaction.component.scss']
})
export class ProteinInteractionComponent implements OnInit {

  form: FormGroup = new FormGroup({
      gene1: new FormControl('', [
          Validators.required
      ]),
      gene2: new FormControl('', [
          Validators.required
      ]),
  });

  @Input () annotationData: any;
  @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

  annotationType: string = "PROTEIN_INTERACTION";

  goFunctions: any;
  goFormatter = (x: any) => x.name;

  constructor(private geneService: GeneService) { }

  ngOnInit() {
      this.goFunctions = (text$: Observable<string>) =>
          text$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              switchMap(term => this.geneService.searchSubcellularLocation(term))
          );
      this.form.valueChanges.subscribe(value => {
          this.setAnnotationData();
      })
  }

  get availableGenes() {
      return this.geneService.enteredGenes$;
  }

  get gene1()
  {
    return this.form.get('gene1');
  }

  get gene2()
  {
    return this.form.get('gene2');
  }

  setAnnotationData()
  {
      this.annotationData.data['gene1'] = this.geneService.allGenes().length == 1 ? this.geneService.allGenes()[0] : this.gene1.value;
      this.annotationData.data['gene2'] = this.geneService.allGenes().length == 1 ? this.geneService.allGenes()[0] : this.gene2.value;
      this.annotationData.data['method'] = this.methodComponent.method;
  }

}
