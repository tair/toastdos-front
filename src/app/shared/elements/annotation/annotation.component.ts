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
  inCurationMode = false;

  constructor(private submissionService: SubmissionService) { }

  ngOnInit() {
    this.inCurationMode = this.submissionService.inCurationMode;
    this.selectedType.setValue(this.annotationModel.annotation.type);
  }

  typeSelected() {
    this.setAnnotationData();
  }

  deleteMe() {
    this.deleted.emit(this.annotationModel);
  }

  setPending() {
    this.annotationModel.annotation.status = 'pending';
    this.submissionService.setAnnotationAtIndex(this.annotationModel.annotation, this.annotationModel.index);
  }

  setAccepted() {
    this.annotationModel.annotation.status = 'accepted';
    this.submissionService.setAnnotationAtIndex(this.annotationModel.annotation, this.annotationModel.index);
  }

  setRejected() {
    this.annotationModel.annotation.status = 'rejected';
    this.submissionService.setAnnotationAtIndex(this.annotationModel.annotation, this.annotationModel.index);
  }


  setAnnotationData()
  {
      this.annotationModel.annotation.type = this.selectedType.value;
      this.submissionService.setAnnotationAtIndex(this.annotationModel.annotation, this.annotationModel.index);
  }

}
