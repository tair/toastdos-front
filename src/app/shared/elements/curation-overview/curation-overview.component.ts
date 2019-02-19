import { Component, OnInit } from '@angular/core';
import {Annotation, Submission, SubmissionService} from '../../services/submission.service';

@Component({
  selector: 'app-curation-overview',
  templateUrl: './curation-overview.component.html',
  styleUrls: ['./curation-overview.component.scss']
})
export class CurationOverviewComponent implements OnInit {

  submission: Submission;

  constructor(private submissionService: SubmissionService) {

  }

  sentanceForAnnotation(anno: Annotation)
  {
    return this.submissionService.sentanceForAnnotation(anno, true);
  }

  ngOnInit() {
    this.submission = this.submissionService.currentSubmission;
  }

}
