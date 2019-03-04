import {Component, Input, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { GeneService } from 'src/app/shared/services/gene.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {Annotation, SubmissionService} from "../../../services/submission.service";
import {ValidationService} from '../../../services/validation.service';

@Component({
  selector: 'app-molecular',
  templateUrl: './molecular.component.html',
  styleUrls: ['./molecular.component.scss']
})
export class MolecularComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
      function: new FormControl(''),
      gene: new FormControl(''),
      method: new FormControl('',)
  });

  @Input () annotation: Annotation;
  @Input () index: number;

  annotationType: string = "MOLECULAR_FUNCTION";

  goFunctions: any;
  goFormatter = (x: any) => x.name;
  methods: any;
  methodFormatter = (x: any) => x.name;

  private validationObservable$;
  methodError = '';
  @ViewChild('methodPopover') methodPopover;
  functionError = '';
  @ViewChild('functionPopover') functionPopover;


  constructor(private geneService: GeneService, private submissionService: SubmissionService, private validationService: ValidationService) { }

  ngOnInit() {
    this.gene.setValue(this.submissionService.currentSubmission.annotations[this.index].data.locusName);
    this.function.setValue(this.submissionService.currentSubmission.annotations[this.index].data.keyword);
    this.method.setValue(this.submissionService.currentSubmission.annotations[this.index].data.method);
    this.goFunctions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.geneService.searchMolecularFunction(term))
      );
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
    if (!this.function.value['id'])
    {
      this.functionError = 'A gene term annotation requires a keyword.';
      this.functionPopover.close();
      this.functionPopover.open();
      err_count += 1;
    }
    return err_count;
  }


  get availableGenes() {
    return this.submissionService.observableGenes;
  }

  get function() {
      return this.form.get('function');
  }

  get gene() {
      return this.form.get('gene');
  }

  get method() {
      return this.form.get('method');
  }

    setAnnotationData()
    {
      let locus = this.submissionService.currentSubmission.genes.length == 1 ? this.submissionService.currentSubmission.genes[0] : this.submissionService.getGeneWithLocus(this.gene.value);
      this.annotation.data.locusName = locus;
      this.annotation.data.keyword = this.function.value;
      this.annotation.data.method = this.method.value;
      if (this.method.value['evidence_code'] === 'IGI' || this.method.value['evidence_code'] === 'IPI') {
        if (!this.annotation.data['evidenceWith']) {
          this.annotation.data.evidenceWith = [];
          this.annotation.data.isEvidenceWithOr = true;
        } else {
          console.log('Updating annotation with evidence already present. gucci');
        }
      } else {
        delete this.annotation.data.evidenceWith;
      }
      this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
    }


}
