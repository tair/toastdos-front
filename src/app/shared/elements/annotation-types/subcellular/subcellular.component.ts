import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

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
        method: new FormControl('', [
            Validators.required
        ])
    });

    annotationType: string = "SUBCELLULAR_LOCATION";

    goFunctions: any;
    goFormatter = (x: any) => x.name;

    constructor(private geneService: GeneService) { }

    ngOnInit() {
        this.goFunctions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(term => this.geneService.searchSubcellularLocation(term))
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
