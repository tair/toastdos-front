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
  annotation_keyword_name: string;
  annotation_keyword_id: string;
  annotation_locus2: string;
  annotation_method_name: string;
  annotation_method_id: string;



  constructor(private submissionService: SubmissionService) { }

  ngOnInit() {
    this.annotation_type = this.annotation.annotation_format; //"gene_term_annotation"
    this.annotation_status = this.annotation.status_id;
    this.annotation_id = this.annotation.annotation_id;
    this.annotation_locus = this.annotation.locus.names[0].locus_name;
    this.annotation_paper = this.annotation.publication.pubmed_id ? this.annotation.publication.pubmed_id : this.annotation.publication.doi;
    this.annotation_submitter = this.annotation.submitter.name;
    this.annotation_date = this.annotation.updated_at;

    if (this.annotation_type==='gene_term_annotation') {
      this.annotation_keyword_name = this.annotation.childData.keyword.name;
      this.annotation_keyword_id = this.annotation.childData.keyword.external_id;
      this.annotation_keyword_id = this.submissionService.idToLink(this.annotation_keyword_id);
      this.annotation_method_name = this.annotation.childData.method.name;
      this.annotation_method_id = this.annotation.childData.method.external_id;
      this.annotation_method_id = this.submissionService.idToLink(this.annotation_method_id);

    }
    if (this.annotation_type==='gene_gene_annotation') {
      this.annotation_locus2 = this.annotation.childData.locus2.names[0].locus_name;
      this.annotation_method_name = this.annotation.childData.method.name;
      this.annotation_method_id = this.annotation.childData.method.external_id;
      this.annotation_method_id = this.submissionService.idToLink(this.annotation_method_id);
    }
  }

  getDate(date_string: string) {
    return new Date(date_string);
  }

  getStatusString(status: any)
  {
    if (status==3)
    {
      return "rejected";
    }
    if (status==1)
    {
      return "pending";
    }
    if (status==2)
    {
      return "accepted";
    }
    return "unknown";
  }

}
