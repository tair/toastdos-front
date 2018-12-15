import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SubmissionService} from "../../services/submission.service";

@Component({
  selector: 'app-curation-detail',
  templateUrl: './curation-detail.component.html',
  styleUrls: ['./curation-detail.component.scss']
})
export class CurationDetailComponent implements OnInit {

  submissionID: string;

  constructor(private route: ActivatedRoute, private submissionService: SubmissionService) {
    this.submissionID = route.snapshot.paramMap.get('id');
    this.submissionService.getCurrentSubmissionWithId(this.submissionID);

  }

  ngOnInit() {
  }

}
