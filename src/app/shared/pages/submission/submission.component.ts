import { Component, OnInit } from '@angular/core';
import { SubmissionService, Submission, Gene, Annotation} from '../../services/submission.service';
import {s} from "@angular/core/src/render3";

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  constructor(private submissionService: SubmissionService) { }
  submission: Submission;
  editing: boolean;

  ngOnInit() {
      this.editing = true;
      this.submissionService.currentSubmission$.subscribe(submission => {
          console.log('change from page');
          console.log(submission);
          this.submission = submission;
      });
  }

  reviewSubmission() {
      this.editing = false;
  }

  resetSubmission() {
    console.log(this.submissionService.resetSubmission());
  }

  editSubmission() {
      this.editing = true;
  }

  submitSubmission(){
      console.log('submitting');
  }

}
