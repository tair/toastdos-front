import { Component, OnInit } from '@angular/core';
import {SubmissionService} from "../../services/submission.service";

@Component({
  selector: 'app-curation',
  templateUrl: './curation.component.html',
  styleUrls: ['./curation.component.scss']
})
export class CurationComponent implements OnInit {
  submissionsInReview = [];
  submissionsNeedReview = [];
  submissionsReviewed = [];

  constructor(private submissionService: SubmissionService) { }

  ngOnInit()
  {
    this.submissionService.submissions.subscribe(next=>{
      this.submissionsInReview = next.inProgress;
      this.submissionsNeedReview = next.needsReview;
      this.submissionsReviewed = next.reviewed;
    });
    this.submissionService.getPageOfSubmissions(1,10);
  }

}
