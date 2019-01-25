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
export class GenesComponent implements OnInit {


  @ViewChildren(LocusComponent) locuses: QueryList<LocusComponent>;
  submission: Submission;

  constructor(private geneService: GeneService, private submissionService: SubmissionService)
  {
    this.submissionService.observableShouldUpdate.asObservable().subscribe(shouldUpdate => {
        if (shouldUpdate) {
          this.submission = this.submissionService.currentSubmission;
        }
      });
  }

  ngOnInit()
  {
    this.submission = this.submissionService.currentSubmission;
  }


  addLocus() {

      this.submissionService.addBlankGene();
  }

  deleteLocus(index: number) {
      this.submissionService.removeGeneAtIndex(index);
  }

}
