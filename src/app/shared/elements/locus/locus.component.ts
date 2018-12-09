import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../services/gene.service";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {Gene, SubmissionService} from "../../services/submission.service";

@Component({
  selector: 'app-locus',
  templateUrl: './locus.component.html',
  styleUrls: ['./locus.component.scss']
})
export class LocusComponent implements OnInit {

  private locusStatus: string;
  private _locusData: any;
  private _gene: Gene;

  @Input() number: number;
  @Input() gene: Gene;

  @Output() deleted: EventEmitter<number> = new EventEmitter();

  @ViewChild('popover') popover;

  private form: FormGroup = new FormGroup({
    locus: new FormControl('', [

    ]),
    gene_symbol: new FormControl('', [

    ]),
    full_gene_name: new FormControl('', [

    ])
  });

  constructor(private geneService: GeneService, private submissionService: SubmissionService) { }

  ngOnInit() {
    this.locusStatus = 'empty';
    this.locus.valueChanges
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
            this._locusData = response;
            this.saveCurrentGene();
          },
          error => {
            this.locusStatus = 'error';
            this.toggleErrorPopover();
          });
    });
    this.gene_symbol.valueChanges.pipe(
        debounceTime(800),
        distinctUntilChanged(),).subscribe(next =>
        {
            this.saveCurrentGene();
        }
    );
    this.full_gene_name.valueChanges.pipe(
        debounceTime(800),
        distinctUntilChanged(),).subscribe(next =>
        {
            this.saveCurrentGene();
        }
    )
  }

  saveCurrentGene(){
      let gene = {} as Gene;
      gene.locusName = this.locus.value;
      gene.geneSymbol = this.gene_symbol.value;
      gene.fullName = this.full_gene_name.value;
      console.log('Saving gene '+ gene);
      this.submissionService.setGeneAtIndex(gene,this.number);

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

  get hasErrors(): boolean {
    return this.form.errors === null;
  }

  get formValue() {
    return this.form.getRawValue();
  }

  get locus() {
    return this.form.get('locus');
  }
  get gene_symbol() {
    return this.form.get('gene_symbol');
  }
  get full_gene_name() {
    return this.form.get('full_gene_name');
  }


}
