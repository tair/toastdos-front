import {Component, Input, OnInit} from '@angular/core';
import {SubmissionService} from '../../services/submission.service';
import {st} from '@angular/core/src/render3';

@Component({
  selector: 'app-annotation-overview',
  templateUrl: './annotation-overview.component.html',
  styleUrls: ['./annotation-overview.component.scss']
})
export class AnnotationOverviewComponent implements OnInit {

  @Input() annotation: any;
  annotation_type: string;
  annotation_status: string;
  annotation_id: string;
  annotation_locus: string;
  annotation_paper: string;
  annotation_submitter: string;
  annotation_date: string;



  constructor() { }

  ngOnInit() {
    this.annotation_type = this.annotation.annotation_format;
    this.annotation_status = this.annotation.status_id;
    this.annotation_id = this.annotation.annotation_id;
    this.annotation_locus = this.annotation.locus.names[0].locus_name;
    this.annotation_paper = this.annotation.publication.pubmed_id ? this.annotation.publication.pubmed_id : this.annotation.publication.doi;
    this.annotation_submitter = this.annotation.submitter.name;
    this.annotation_date = this.annotation.updated_at;
  }

  getDate(date_string: string) {
    return new Date(date_string);
  }

  getStatusString(status: any)
  {
    console.log(status);
    if (status==0)
    {
      return "rejected";
    }
    if (status==1)
    {
      return "accepted";
    }
    if (status==2)
    {
      return "pending";
    }
    return "unknown";
  }

}
