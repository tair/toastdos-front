import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../services/gene.service";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-locus',
  templateUrl: './locus.component.html',
  styleUrls: ['./locus.component.scss']
})
export class LocusComponent implements OnInit {

  private locusStatus: string;
  private locusData: any;

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

  constructor(private geneService: GeneService) { }

  ngOnInit() {
    this.locusStatus = "empty";
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
        .subscribe((response: any)=> {
            this.locusStatus = 'success';
            this.toggleErrorPopover();
            this.locusData = response;
            console.log(this.locusData)
          },
          error => {
            console.log(error);
            this.locusStatus = 'error';
            this.toggleErrorPopover();
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
    if (this.locusStatus=='error') {
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
