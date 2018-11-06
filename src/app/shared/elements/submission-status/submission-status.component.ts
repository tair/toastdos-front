import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submission-status',
  templateUrl: './submission-status.component.html',
  styleUrls: ['./submission-status.component.scss']
})
export class SubmissionStatusComponent implements OnInit {
  @Input() submission: any;

  constructor() { }

  ngOnInit() {
  }

  getDate(date_string: string) {
    return new Date(date_string);
  }

}
