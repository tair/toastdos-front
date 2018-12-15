import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../services/gene.service";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {Gene, SubmissionService} from "../../services/submission.service";
import * as deepEqual from "deep-equal";

@Component({
  selector: 'app-locus',
  templateUrl: './locus.component.html',
  styleUrls: ['./locus.component.scss']
})
export class LocusComponent implements OnInit {

  private locusStatus: string;
  private _locusData: any;

  @Input() number: number;

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
    //init
    let gene = this.submissionService.getGeneAtIndex(this.number);
    if (gene.locusName.length>2)
    {
        this.locusStatus = 'success';
    }
    this.form.setValue({'locus': gene.locusName,
                              'gene_symbol': gene.geneSymbol,
                              'full_gene_name': gene.fullName});
    //subscribe to futur changes
    this.submissionService.currentSubmission$.subscribe(next=>{
       let gene = next.genes[this.number];
       //if the change was from something  that wasnt us then we update our content
       if (!deepEqual(gene, this.getGene()) && gene) {
           this.form.setValue({'locus': gene.locusName,
                                    'gene_symbol': gene.geneSymbol,
                                    'full_gene_name': gene.fullName});
           this.locusStatus = 'success';
       }
    });

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
  }



  getGene()
  {
      let gene = {} as Gene;
      gene.locusName = this.locus.value;
      gene.geneSymbol = this.gene_symbol.value;
      gene.fullName = this.full_gene_name.value;
      return gene;
  }

  saveCurrentGene(){
      let gene = this.getGene();
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
