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
    console.log(anno);
    if (this.submissionService.inCurationMode)
    {
      return this.submissionService.sentanceForAnnotationInReview(anno);
    }
    return this.submissionService.sentanceForAnnotation(anno, this.submissionService.inCurationMode);
  }

  ngOnInit() {
    this.submission = this.submissionService.currentSubmission;
  }


}
