import {Component, OnInit, Input, Output, AfterViewInit, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import {SubmissionService} from "../../services/submission.service";

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {

  @Input() annotationModel: any;
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  selectedType: FormControl = new FormControl('MOLECULAR_FUNCTION');
  usable = false;

  constructor(private submissionService: SubmissionService) { }

  ngOnInit() {

  }

  typeSelected() {
    console.log(this.selectedType.value);
    this.setAnnotationData();
  }

  deleteMe() {
    this.deleted.emit(this.annotationModel);
  }


  setAnnotationData()
  {
      if (this.usable)
      {
          this.annotationModel.annotation.type = this.selectedType.value;
          this.submissionService.setAnnotationAtIndex(this.annotationModel.annotation, this.annotationModel.index);
      }
  }

  ngAfterViewInit() {
      this.usable=false;
      setTimeout(() => {
          if (this.annotationModel.annotation.type) {
              this.selectedType.setValue(this.annotationModel.annotation.type);
              this.usable = true;
          }
      });
  }

}
