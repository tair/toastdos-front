import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Submission, SubmissionService} from '../../services/submission.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-curation-detail',
  templateUrl: './curation-detail.component.html',
  styleUrls: ['./curation-detail.component.scss']
})
export class CurationDetailComponent implements OnInit {

  submission: Submission;
  editing: boolean;
  saved: boolean;
  submiting: boolean;
  error: boolean;
  actionType: string;


  constructor(private route: ActivatedRoute, private submissionService: SubmissionService) {

  }

  ngOnInit() {
    this.route.data.subscribe((data:{submission: Submission}) =>{
      this.submissionService.getCurrentSubmissionWithData(data.submission);
    });
    this.editing = true;
    this.saved = false;
    this.submiting = false;
    this.error = false;
    this.submission = this.submissionService.currentSubmission;
    this.submissionService.inCurationMode = true;
  }

  getDate(date_string: string) {
    return new Date(date_string);
  }

  reviewSubmission() {
    this.editing = false;
  }

  editSubmission() {
      this.editing = true;
  }

  submitSubmission(){
      this.submiting = true;
      this.submissionService.saveCuration(resp=> {
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

}
