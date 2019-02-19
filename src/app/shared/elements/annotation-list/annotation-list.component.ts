import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AnnotationComponent} from "../annotation/annotation.component";
import {AnnotationService} from "../../services/annotation.service";
import {Annotation, SubmissionService} from "../../services/submission.service";
import * as deepEqual from "deep-equal";


@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {

  @ViewChildren(AnnotationComponent) annotations: QueryList<AnnotationComponent>;
  annotationModels: any[] = [{index:0,annotation:{} as Annotation}];
  geneList = [];


  constructor(private submissionService: SubmissionService) { }

  ngOnInit() {
      this.submissionService.observableGenes.asObservable().subscribe(next => {
        this.geneList = next;
      });
      //this is if we want to reset of whatever
      this.submissionService.observableShouldUpdate.asObservable().subscribe(shouldUpdate => {
        if (shouldUpdate) {
          this.annotationModels = [];
            let i = 0;
            for (let a of this.submissionService.currentSubmission.annotations) {
                this.annotationModels.push({index: i, annotation: a});
                i += 1;
            }
        }
      });
      //load models here when we get them for curation
      this.annotationModels = [];
      let i = 0;
      for (let a of this.submissionService.currentSubmission.annotations) {
          this.annotationModels.push({index: i, annotation: a});
          i += 1;
      }
  }

  addAnnotation() {
    this.submissionService.addBlankAnnotation();
    let nSubs = this.submissionService.currentSubmission.annotations.length-1;
    if (this.submissionService.currentSubmission.genes.length>=1) {
        this.submissionService.currentSubmission.annotations[nSubs].data.locusName = this.submissionService.currentSubmission.genes[0];
        if (this.submissionService.currentSubmission.genes.length>=2) {
            this.submissionService.currentSubmission.annotations[nSubs].data.locusName2 = this.submissionService.currentSubmission.genes[1];
        }
    }
    this.annotationModels.push({index: nSubs, annotation: this.submissionService.currentSubmission.annotations[nSubs]});
  }

  removeAnnotation(annoModelToDelete: any)
  {
    this.submissionService.removeAnnotationAtIndex(annoModelToDelete.index);
    this.annotationModels.splice(annoModelToDelete.index, 1);
    let i = 0;
    for (let a of this.submissionService.currentSubmission.annotations) {
          this.annotationModels[i]['index'] = i;
          this.annotationModels[i]['annotation'] = a;
          i += 1;
      }
  }



}
