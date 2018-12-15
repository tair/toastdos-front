import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LocusComponent} from '../locus/locus.component';
import { GeneService } from '../../services/gene.service';
import {SubmissionService, Submission} from "../../services/submission.service";
import {Gene} from "../../services/submission.service";
import * as deepEqual from "deep-equal";

@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.scss']
})
export class GenesComponent implements OnInit, AfterViewInit {


  @ViewChildren(LocusComponent) locuses: QueryList<LocusComponent>;
  submission: Submission;

  constructor(private geneService: GeneService, private submissionService: SubmissionService)
  {
      this.submission = this.submissionService.currentSubmissionValue();
  }

  ngOnInit()
  {

  }

  ngAfterViewInit() {
    this.submissionService.currentSubmission$.subscribe(nextSubmission=>{
          this.submission.genes = nextSubmission.genes;
    });
  }

  addLocus() {
      this.submission.genes.push({
          locusName: "",
          geneSymbol: "",
          fullName: ""
      } as Gene);

      this.submissionService.setSubmission(this.submission);
  }

  deleteLocus(index: number) {
      this.submission.genes.splice(index, 1);
      this.submissionService.setSubmission(this.submission);
  }

}
