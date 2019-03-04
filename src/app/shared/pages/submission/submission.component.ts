import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SubmissionService, Submission, Gene, Annotation} from '../../services/submission.service';
import {s} from "@angular/core/src/render3";
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ValidationService} from '../../services/validation.service';


@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  constructor(private submissionService: SubmissionService, private  validationService: ValidationService,
              private toastr: ToastrService) { }
  submission: Submission;
  editing: boolean;
  saved: boolean;
  submiting: boolean;
  error: boolean;
  errorMessage: string;

  ngOnInit() {
      this.editing = true;
      this.saved = false;
      this.submiting = false;
      this.error = false;
      this.errorMessage = 'Undefined Error';
      this.submissionService.inCurationMode = false;
      this.submissionService.attemptToLoadDraft();
      this.submissionService.observableSavedDraft.subscribe(saved => {
        if (saved) {
          this.toastr.success('Saved current draft', 'Draft saved!');
        } else{
          //dang
          //this.toastr.error('Failed to save current draft', 'Draft failed to save');
        }
      });

  }

  reviewSubmission() {
    this.validationService.validateForms(numErrors => {
      console.log('got ' + numErrors + ' errors');
      if (numErrors<1)
      {
        this.submissionService.saveDraft();
        this.editing = false;
      }
    });
  }

  resetSubmission() {
    this.submissionService.resetSubmission();
  }

  editSubmission() {
    this.editing = true;
    this.submissionService.observableShouldUpdate.next(true);
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
            console.log(err);
            this.errorMessage = err['error'];
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
