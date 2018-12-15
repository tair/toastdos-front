import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AnnotationComponent} from "../annotation/annotation.component";
import {AnnotationService} from "../../services/annotation.service";
import {SubmissionService} from "../../services/submission.service";

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {

  @ViewChildren(AnnotationComponent) annotations: QueryList<AnnotationComponent>;
  annotationModels: any[] = [{index:0,data:{}}];


  constructor(private annotationService: AnnotationService, private submissisonService: SubmissionService) { }

  ngOnInit() {
    //load models here when we get them for curation
    // this.submissisonService.currentSubmission$.subscribe(next => {
    //   let models = [];
    //     for (let a of next.annotations) {
    //
    //     }
    // });
  }

  addAnnotation() {
    let max = 0;
    for (let x of this.annotationModels) //lets try to write more this stuff. its just easier on everyone
    {
      if(x.index>max)
      {
        max = x.index;
      }
    }
    this.annotationModels.push({index:max+1, data:{}});
  }

  removeAnnotation(annoModelToDelete: any)
  {
    this.annotationModels.splice(annoModelToDelete.index,1);
    let i = 0;
    for (let m of this.annotationModels)
    {
      m.index = i;
      i += 1;
    }
  }


}
