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
    this.submissisonService.currentSubmission$.subscribe(next => {
      let annos = this.annotationModels.map(x=>x.annotation);
      if (deepEqual(annos, next.annotations))
      {

      } else {
          let i = 0;
          this.annotationModels = [];
          for (let a of next.annotations) {
              this.annotationModels.push({index: i, annotation: a});
              i += 1;
          }
      }

    });
  }

  addAnnotation() {
    this.submissisonService.addBlankAnnotation();
  }

  removeAnnotation(annoModelToDelete: any)
  {
    this.submissisonService.removeAnnotationAtIndex(annoModelToDelete.index);
  }


}
