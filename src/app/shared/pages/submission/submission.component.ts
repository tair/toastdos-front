import { Component, OnInit } from '@angular/core';
import { SubmissionService, Submission} from '../../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  constructor(private submissionService: SubmissionService) { }
  submission: Submission;

  ngOnInit() {
      this.submissionService.currentSubmission$.subscribe(submission => {
          this.submission = submission;
      });
  }

  reviewSubmission() {
      console.log(this.submission);
  }

  resetSubmission() {
    console.log(this.submissionService.setSubmission({
        publicationId:'',
        genes:[],
        annotations:[]
    }));
  }

}
