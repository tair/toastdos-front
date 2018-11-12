import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";

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
    });

    @Input () annotationData: any;
    @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

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
    }
}
