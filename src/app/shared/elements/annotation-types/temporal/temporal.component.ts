import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-temporal',
  templateUrl: './temporal.component.html',
  styleUrls: ['./temporal.component.scss']
})
export class TemporalComponent implements OnInit {

    form: FormGroup = new FormGroup({
        function: new FormControl('', [
            Validators.required
        ]),
        method: new FormControl('', [
            Validators.required
        ])
    });

    annotationType: string = "TEMPORAL_EXPRESSION";

    goFunctions: any;
    goFormatter = (x: any) => x.name;

    constructor(private geneService: GeneService) { }

    ngOnInit() {
        this.goFunctions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(term => this.geneService.searchTemporalExpression(term))
            );
    }

    get availableGenes() {
        return this.geneService.enteredGenes$;
    }

    get function() {
        return this.form.get('function');
    }

    get method() {
        return this.form.get('method');
    }

}
