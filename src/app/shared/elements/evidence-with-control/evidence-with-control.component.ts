import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Annotation, Submission, SubmissionService} from '../../services/submission.service';
import {EvidenceWithLocusComponent} from '../evidence-with-locus/evidence-with-locus.component';
import {GeneService} from '../../services/gene.service';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-evidence-with-control',
  templateUrl: './evidence-with-control.component.html',
  styleUrls: ['./evidence-with-control.component.scss']
})
export class EvidenceWithControlComponent implements OnInit {

  @Input () annotation: Annotation;
  @Input () index: number;
  @ViewChildren(EvidenceWithLocusComponent) locuses: QueryList<EvidenceWithLocusComponent>;
  evidenceWiths = [];
  relationType = 'OR';

  constructor(private submissionService: SubmissionService)
  {

  }

  toggleRelation()
  {
    if (this.relationType==='OR'){
      this.relationType='AND';
    } else {
      this.relationType='OR';
    }
    this.updateAnnotationData();
  }

  ngOnInit()
  {
    this.evidenceWiths = this.annotation.data.evidenceWith;
    if(this.evidenceWiths.length==0){
      this.evidenceWiths.push('');
    }
    if (this.annotation.data.isEvidenceWithOr) {
      this.relationType='OR';
    } else {
      this.relationType='AND';
    }
  }

  addLocus()
  {
      this.evidenceWiths.push('');
      this.updateAnnotationData();
  }

  deleteLocus(j: number)
  {

    let evidences = [];
    let i = 0;
    for (let comp of this.locuses.toArray())
    {
      if (i!=j) {
        evidences.push(comp.locusField.value);
      }
      i+=1;
    }
    this.evidenceWiths= evidences;
    this.updateAnnotationData();
  }

  updateAnnotationData(){
    let evidences = [];
    for (let comp of this.locuses.toArray())
    {
      if (comp.verificationStatus === 'success') {
        evidences.push(comp.locusField.value)
      }
    }
    console.log(evidences);
    if (evidences.length>0)
    {
      this.annotation.data.evidenceWith = evidences;
      this.annotation.data.isEvidenceWithOr = this.relationType==='OR';
      this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
    }
  }

}
