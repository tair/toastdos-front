import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AnnotationComponent} from "../annotation/annotation.component";
import {AnnotationService} from "../../services/annotation.service";

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {

  @ViewChildren(AnnotationComponent) annotations: QueryList<AnnotationComponent>;
  annotationModels: any[] = [{index:0,data:{}}];


  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {

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
    console.log(this.annotationModels);
  }

  removeAnnotation(annoModelToDelete: any)
  {
    console.log('deleting');
    console.log(this.annotationModels);
    this.annotationModels.splice(annoModelToDelete.index,1)
  }


}
