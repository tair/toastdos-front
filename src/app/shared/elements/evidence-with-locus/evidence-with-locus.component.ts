import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Annotation, Gene, SubmissionService} from '../../services/submission.service';
import {GeneService} from '../../services/gene.service';

@Component({
  selector: 'app-evidence-with-locus',
  templateUrl: './evidence-with-locus.component.html',
  styleUrls: ['./evidence-with-locus.component.scss']
})
export class EvidenceWithLocusComponent implements OnInit {

  private locusStatus: string;

  @Input() number: number;
  @Input() locus: string;
  @Output() deleted: EventEmitter<number> = new EventEmitter();
  @Output() verified: EventEmitter<number> = new EventEmitter();

  @ViewChild('popover') popover;

  private form: FormGroup = new FormGroup({
    locusField: new FormControl('', [

    ]),
  });

  constructor(private geneService: GeneService) { }

  ngOnInit() {
    this.locusStatus = 'empty';
    //init
    if (this.locus.length>8)
    {
        this.locusStatus = 'success';
    }
    this.form.setValue({'locusField': this.locus});

    this.locusField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(value => {
          this.locusStatus = 'loading';
          this.toggleErrorPopover();
        })
      ).subscribe((value: string) => {
      this.geneService.checkLocus$(value)
        .subscribe((response: any) => {
            this.locusStatus = 'success';
            this.toggleErrorPopover();
            this.verified.emit(this.number);
          },
          error => {
            this.locusStatus = 'error';
            this.toggleErrorPopover();
            this.verified.emit(this.number);
          });
    });
  }


  getColor(status)
  {
    switch (status) {
      case 'empty':
        return 'black';
      case 'loading':
        return 'black';
      case 'success':
        return 'green';
      case 'error':
        return 'red';
    }
  }

  toggleErrorPopover() {
    if (this.locusStatus === 'error') {
      this.popover.open();
    } else {
      this.popover.close();
    }
  }

  delete() {
    this.deleted.emit(this.number);
  }


  get locusField() {
    return this.form.get('locusField');
  }

  get verificationStatus() {
    return this.locusStatus;
  }

}
