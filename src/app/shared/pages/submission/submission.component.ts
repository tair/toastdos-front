import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SubmissionService, Submission, Gene, Annotation} from '../../services/submission.service';
import {s} from "@angular/core/src/render3";
import {Router} from '@angular/router';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  constructor(private submissionService: SubmissionService, private  detector: ChangeDetectorRef) { }
  submission: Submission;
  editing: boolean;
  saved: boolean;
  submiting: boolean;
  error: boolean;

  ngOnInit() {
      this.editing = true;
      this.saved = false;
      this.submiting = false;
      this.error = false;
      this.submissionService.inCurationMode = false;

  }

  reviewSubmission() {
      this.editing = false;
  }

  resetSubmission() {
    this.submissionService.resetSubmission();
  }

  editSubmission() {
      this.editing = true;
  }

  submitSubmission(){
      this.submiting = true;
      this.submissionService.postSubmission(resp=> {
          if (resp===null)
          {
              this.submiting = false;
              this.saved = true;
          }
      }, err=> {
            this.submiting = false;
            this.error = true;
      });
  }

  newSubmission()
  {
      this.editing = true;
      this.saved = false;
      this.submiting = false;
      this.error = false;
      this.submissionService.resetSubmission();
  }

}
