import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {Annotation, SubmissionService} from "../../../services/submission.service";

@Component({
  selector: 'app-annatomical',
  templateUrl: './annatomical.component.html',
  styleUrls: ['./annatomical.component.scss']
})
export class AnnatomicalComponent implements OnInit {

    form: FormGroup = new FormGroup({
        function: new FormControl('', [
            Validators.required
        ]),
        gene: new FormControl('', [
            Validators.required
        ])
    });

    @Input () annotationData: any;
    @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

    annotationType: string = "ANATOMICAL_LOCATION";

    goFunctions: any;
    goFormatter = (x: any) => x.name;

    constructor(private geneService: GeneService, private submissionService: SubmissionService) { }

    ngOnInit() {
        this.goFunctions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(term => this.geneService.searchAnatomicalLocation(term)));
        this.form.valueChanges.subscribe(value => {
            this.setAnnotationData();
        })
    }



    get availableGenes() {
        return this.geneService.enteredGenes$;
    }

    get function() {
        return this.form.get('function');
    }

    get gene() {
        return this.form.get('gene');
    }

    setAnnotationData()
    {
        this.annotationData.data['gene1'] = this.geneService.allGenes().length == 1 ? this.geneService.allGenes()[0] : this.gene.value;
        this.annotationData.data['function'] = this.function.value;
        this.annotationData.data['method'] = this.methodComponent.method;
        let anno = {} as Annotation;
        anno.type = this.annotationType;
        anno.data = this.annotationData.data;
        this.submissionService.setAnnotationAtIndex(anno, this.annotationData.index);
    }



}
