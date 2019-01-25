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


  constructor(private annotationService: AnnotationService, private submissisonService: SubmissionService) { }

  ngOnInit() {
      //load models here when we get them for curation
      this.annotationModels = [];
      let i = 0;
      for (let a of this.submissisonService.currentSubmission.annotations) {
          this.annotationModels.push({index: i, annotation: a});
          i += 1;
      }
  }

  addAnnotation() {
    this.submissisonService.addBlankAnnotation();
  }

  removeAnnotation(annoModelToDelete: any)
  {
    this.submissisonService.removeAnnotationAtIndex(annoModelToDelete.index);
  }


}
