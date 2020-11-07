import {Component, Input, OnInit} from '@angular/core';
import {SubmissionService} from '../../services/submission.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-submission-status',
  templateUrl: './submission-status.component.html',
  styleUrls: ['./submission-status.component.scss']
})
export class SubmissionStatusComponent implements OnInit {
  @Input() submission: any;

  constructor(private submissionService: SubmissionService,  private router: Router) { }

  ngOnInit() {
  }

  getDate(date_string: string) {
    return new Date(date_string);
  }

  reviewClick(){
    this.router.navigate(['/curation', 'detail', this.submission.id]);
  }

}
