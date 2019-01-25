import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Annotation, SubmissionService} from "../../../services/submission.service";

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
      method: new FormControl('', [
          Validators.required
      ])
  });

  @Input () annotation: Annotation;
  @Input () index: number;
  @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

  annotationType: string = "PROTEIN_INTERACTION";

  methods: any;
  methodFormatter = (x: any) => x.name;
  usable = false;

  constructor(private geneService: GeneService, private submissionService: SubmissionService) { }

  ngOnInit() {
      this.methods = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.geneService.searchMethods(term, this.annotationType))
      );
      this.form.valueChanges.subscribe(value => {
          this.setAnnotationData();
      })
  }

  get availableGenes() {
    return this.submissionService.observableGenes;
  }


  get gene1() {
      return this.form.get('gene1');
  }

  get gene2() {
      return this.form.get('gene2');
  }

  get method() {
      return this.form.get('method');
  }

  setAnnotationData()
  {
      let locus = this.submissionService.currentSubmission.genes.length == 1 ? this.submissionService.currentSubmission.genes[0] : this.submissionService.getGeneWithLocus(this.gene1.value);
      let locus2 = this.submissionService.currentSubmission.genes.length == 1 ? this.submissionService.currentSubmission.genes[0] : this.submissionService.getGeneWithLocus(this.gene2.value);
      this.annotation.data.locusName = locus;
      this.annotation.data.locusName2 = locus2;
      this.annotation.data.method = this.method.value;
      this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
  }


}
