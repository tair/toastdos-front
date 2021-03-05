import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Annotation, Gene, SubmissionService} from "../../../services/submission.service";
import {ValidationService} from '../../../services/validation.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({
        gene: new FormControl('', [
            Validators.required
        ]),
        comment: new FormControl('', [
            Validators.required
        ]),
    });

    @Input () annotation: Annotation;
    @Input () index: number;
    @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

    annotationType: string = "COMMENT";

    goFunctions: any;
    goFormatter = (x: any) => x.name;
    usable = false;

    private validationObservable$;
    @ViewChild('functionPopover') functionPopover;
    geneError = '';
    @ViewChild('genePopover') genePopover;


    constructor(private geneService: GeneService, private submissionService: SubmissionService, private validationService: ValidationService) { }


    ngOnInit() {
      this.gene.setValue(this.submissionService.currentSubmission.annotations[this.index].data.locusName.locusName);
        this.comment.setValue(this.submissionService.currentSubmission.annotations[this.index].data.text);
        this.goFunctions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(term => this.geneService.searchSubcellularLocation(term))
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
      this.checkAvailableGenes();
      let err_count = 0;
      if (this.comment.value.toString().length<1)
      {
        this.functionPopover.close();
        this.functionPopover.open();
        err_count += 1;
      }
      if (!this.gene.value)
      {
        this.geneError = 'Gene field cannot be empty. Please choose a gene.';
        this.genePopover.close();
        this.genePopover.open();
        err_count += 1;
      }
      return err_count;
    }

    get availableGenes() {
    return this.submissionService.observableGenes;
    }

  get comment() {
      return this.form.get('comment');
  }

  get gene() {
      return this.form.get('gene');
  }


  setAnnotationData()
  {
      let emptyGene = {locusName:'',geneSymbol:'',fullName:''} as Gene;
      let locus = this.gene.value?this.submissionService.getGeneWithLocus(this.gene.value):emptyGene;
      this.annotation.data.locusName = locus;
      this.annotation.type = this.annotationType;
      this.annotation.data.text = this.comment.value.toString();
      this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
  }

  checkAvailableGenes() {
    if (!this.availableGenes.value.map(g => g.locusName).includes(this.gene.value)){
        this.gene.setValue('');
    }
  }

}
