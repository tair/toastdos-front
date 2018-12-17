import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Annotation, SubmissionService} from "../../../services/submission.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
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

    constructor(private geneService: GeneService, private submissionService: SubmissionService) { }

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
    return this.submissionService.currentGenes$;
  }

  get comment() {
      return this.form.get('comment');
  }

  get gene() {
      return this.form.get('gene');
  }


  setAnnotationData()
  {
      if (this.usable) {
          let locus = this.submissionService.currentSubmissionValue().genes.length == 1 ? this.submissionService.currentSubmissionValue().genes[0] : this.submissionService.getGeneWithLocus(this.gene.value);
          this.annotation.data.locusName = locus;
          this.annotation.data.text = this.comment.value;
          this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
      }
  }

  ngAfterViewInit() {
      this.usable=false;
      setTimeout(() => {
          if (this.annotation.data) {
              this.gene.setValue(this.annotation.data.locusName.locusName);
              this.comment.setValue(this.annotation.data.text);
              this.usable = true;
          }
      });
  }

}
