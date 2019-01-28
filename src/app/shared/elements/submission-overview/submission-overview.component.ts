import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Annotation, Submission, SubmissionService} from "../../services/submission.service";


@Component({
  selector: 'app-submission-overview',
  templateUrl: './submission-overview.component.html',
  styleUrls: ['./submission-overview.component.scss']
})
export class SubmissionOverviewComponent implements OnInit {

  submission: Submission;

  constructor(private submissionService: SubmissionService) {

  }

  sentanceForAnnotation(anno:Annotation)
  {
    return this.submissionService.sentanceForAnnotation(anno);
  }

  ngOnInit() {
    this.submission = this.submissionService.currentSubmission;
  }


}
