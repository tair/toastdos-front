import {Component, Input, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Annotation, SubmissionService} from "../../../services/submission.service";
import {ValidationService} from '../../../services/validation.service';

@Component({
  selector: 'app-protein-interaction',
  templateUrl: './protein-interaction.component.html',
  styleUrls: ['./protein-interaction.component.scss']
})
export class ProteinInteractionComponent implements OnInit, OnDestroy {

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

  private validationObservable$;
  methodError = '';
  @ViewChild('methodPopover') methodPopover;



  constructor(private geneService: GeneService, private submissionService: SubmissionService, private validationService: ValidationService) { }

  ngOnInit() {
      this.gene1.setValue(this.submissionService.currentSubmission.annotations[this.index].data.locusName.locusName);
      this.gene2.setValue(this.submissionService.currentSubmission.annotations[this.index].data.locusName2.locusName);
      this.method.setValue(this.submissionService.currentSubmission.annotations[this.index].data.method);
      this.methods = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.geneService.searchMethods(term, this.annotationType))
      );
      this.form.valueChanges.subscribe(value => {
          this.setAnnotationData();
      });

        this.validationObservable$ = this.validationService.observableShouldValidateForms.asObservable().subscribe( shouldValidate => {
      if (shouldValidate) {
        let numErrorsInMe = this.validate();
        this.validationService.addToErrorList(numErrorsInMe);
      }
    });
  }

  ngOnDestroy() {
      this.validationObservable$.unsubscribe();
  }

  validate() {
    let err_count = 0;
    if (!this.method.value['id'])
    {
      this.methodError = 'Method is required. Please enter the experimental method that provides evidence to support the annotation.';
      this.methodPopover.close();
      this.methodPopover.open();
      err_count += 1;
    }
    return err_count;
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
      let locus = this.submissionService.getGeneWithLocus(this.gene1.value);
      let locus2 = this.submissionService.getGeneWithLocus(this.gene2.value);
      this.annotation.data.locusName = locus;
      this.annotation.data.locusName2 = locus2;
      this.annotation.data.method = this.method.value;
      this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
  }


}
