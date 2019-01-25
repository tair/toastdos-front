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

  }

}
