import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {SubmissionService} from "../../services/submission.service";
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-curation-detail',
  templateUrl: './curation-detail.component.html',
  styleUrls: ['./curation-detail.component.scss']
})
export class CurationDetailComponent implements OnInit {

  submissionID: string;

  constructor(private route: ActivatedRoute, private submissionService: SubmissionService) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.submissionID = params.get('id');
        this.submissionService.getCurrentSubmissionWithId(this.submissionID)
      });
  }

}
