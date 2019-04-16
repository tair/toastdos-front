import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneService} from '../../services/gene.service';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {Gene, SubmissionService} from '../../services/submission.service';
import {ValidationService} from '../../services/validation.service';
import {SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-locus',
  templateUrl: './locus.component.html',
  styleUrls: ['./locus.component.scss']
})
export class LocusComponent implements OnInit, OnDestroy {

  private locusStatus: string;
  private _locusData: any;
  errorMessage = "INVALID: A valid gene is required";

  @Input() number: number;

  @Output() deleted: EventEmitter<number> = new EventEmitter();

  @ViewChild('popover') popover;

  private form: FormGroup = new FormGroup({
    locus: new FormControl(''),
    gene_symbol: new FormControl(''),
    full_gene_name: new FormControl('')
  });

  private validationObservable$;

  constructor(private geneService: GeneService,
              private submissionService: SubmissionService,
              private validationService: ValidationService) {

  }

  ngOnDestroy() {
    this.validationObservable$.unsubscribe();
  }

  ngOnInit() {
    this.locusStatus = 'empty';
    let gene = this.submissionService.currentSubmission.genes[this.number];
    if (gene.locusName.length>2)
    {
        this.locusStatus = 'success';
    }
    this.form.setValue({'locus': gene.locusName,
                              'gene_symbol': gene.geneSymbol,
                              'full_gene_name': gene.fullName});

    this.locus.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter(x=> x.length>=5),
        tap(value => {
          this.locusStatus = 'loading';
          this.toggleErrorPopover();
        })
      ).subscribe((value: string) => {
        value = value.toUpperCase();
        this.geneService.checkLocus$(value)
          .subscribe((response: any) => {
              this.locusStatus = 'success';
              this.toggleErrorPopover();
              this._locusData = response;
              this.saveCurrentGene();
            },
            error => {
              this.locusStatus = 'error';
              this.errorMessage = "Invalid Gene";
              this.toggleErrorPopover();
            });
    });

    this.validationObservable$ = this.validationService.observableShouldValidateForms.asObservable().subscribe( shouldValidate => {
      if (shouldValidate) {
        let numErrorsInMe = this.validate();
        this.validationService.addToErrorList(numErrorsInMe);
      }
    });

  }

  validate() {
    if (this.locusStatus=='error' || this.locus.value.toString().length<2)
    {
      this.errorMessage = "INVALID: A valid gene is required";
      this.locusStatus = 'error';
      this.popover.close();
      this.popover.open();
      return 1;
    }
    return 0;
  }


  getGene()
  {
      let gene = {} as Gene;
      gene.locusName = this.locus.value.toUpperCase();
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
