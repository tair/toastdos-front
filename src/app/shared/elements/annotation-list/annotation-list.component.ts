import {Component, Input, OnInit, QueryList, ViewChildren, ChangeDetectionStrategy} from '@angular/core';
import {AnnotationComponent} from "../annotation/annotation.component";
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
  inCurationMode = false;

  constructor(private submissionService: SubmissionService) { }

  ngOnInit() {
      this.inCurationMode = this.submissionService.inCurationMode;
      this.submissionService.observableGenes.asObservable().subscribe(next => {
        this.geneList = next;
      });
      //this is if we want to reset of whatever
      this.submissionService.observableShouldUpdate.asObservable().subscribe(shouldUpdate => {
        if (shouldUpdate) {
          let models = [];
            let i = 0;
            for (let a of this.submissionService.currentSubmission.annotations) {
                models.push({index: i, annotation: a});
                i += 1;
            }
            this.annotationModels = models;
        }
      });
      //load models here when we get them for curation
      let models = [];
      let i = 0;
      for (let a of this.submissionService.currentSubmission.annotations) {
          models.push({index: i, annotation: a});
          i += 1;
      }
      this.annotationModels = models;
  }

  addAnnotation() {
    this.submissionService.addBlankAnnotation();
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
