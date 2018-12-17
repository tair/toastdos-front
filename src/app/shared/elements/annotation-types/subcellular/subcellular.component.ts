import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {Annotation, SubmissionService} from "../../../services/submission.service";

@Component({
  selector: 'app-subcellular',
  templateUrl: './subcellular.component.html',
  styleUrls: ['./subcellular.component.scss']
})
export class SubcellularComponent implements OnInit {

    form: FormGroup = new FormGroup({
      function: new FormControl('', [
          Validators.required
      ]),
      gene: new FormControl('', [
          Validators.required
      ]),
      method: new FormControl('', [
          Validators.required
      ])
    });

    @Input () annotation: Annotation;
    @Input () index: number;

    annotationType: string = "SUBCELLULAR_LOCATION";

    goFunctions: any;
    goFormatter = (x: any) => x.name;
    methods: any;
    methodFormatter = (x: any) => x.name;
    usable = false;

    constructor(private geneService: GeneService, private submissionService: SubmissionService) { }

    ngOnInit() {
        this.goFunctions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(term => this.geneService.searchSubcellularLocation(term))
            );
        this.methods = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.geneService.searchMethods(term, this.annotationType))
      );
        this.form.valueChanges.subscribe(value => {
            this.setAnnotationData();
        })
    }

    get availableGenes() {
        return this.submissionService.currentGenes$;
    }

    get function() {
      return this.form.get('function');
    }

    get gene() {
      return this.form.get('gene');
    }

    get method() {
      return this.form.get('method');
    }

    setAnnotationData()
    {
      if (this.usable) {
          let locus = this.submissionService.currentSubmissionValue().genes.length == 1 ? this.submissionService.currentSubmissionValue().genes[0] : this.submissionService.getGeneWithLocus(this.gene.value);
          this.annotation.data.locusName = locus;
          this.annotation.data.keyword = this.function.value;
          this.annotation.data.method = this.method.value;
          this.submissionService.setAnnotationAtIndex(this.annotation, this.index);
      }
    }

    ngAfterViewInit() {
      this.usable=false;
      setTimeout(() => {
          if (this.annotation.data) {
              this.function.setValue(this.annotation.data.keyword);
              this.gene.setValue(this.annotation.data.locusName.locusName);
              this.method.setValue(this.annotation.data.method);
              this.usable = true;
          }
      });
    }
}
