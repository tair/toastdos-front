import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MethodDropdownComponent} from "../../method-dropdown/method-dropdown.component";
import {GeneService} from "../../../services/gene.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Annotation, SubmissionService} from "../../../services/submission.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    form: FormGroup = new FormGroup({
        gene: new FormControl('', [
            Validators.required
        ]),
        comment: new FormControl('', [
            Validators.required
        ]),
    });

    @Input () annotationData: any;
    @ViewChild(MethodDropdownComponent) methodComponent: MethodDropdownComponent;

    annotationType: string = "COMMENT";

    goFunctions: any;
    goFormatter = (x: any) => x.name;

    constructor(private geneService: GeneService, private submissionService: SubmissionService) { }

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

    get gene()
    {
        return this.form.get('gene');
    }

    get comment()
    {
        return this.form.get('comment');
    }

    setAnnotationData()
    {

        this.annotationData.data['gene1'] = this.geneService.allGenes().length == 1 ? this.geneService.allGenes()[0] : this.gene.value;
        this.annotationData.data['comment'] = this.comment.value;
        let anno = {} as Annotation;
        anno.type = this.annotationType;
        anno.data = this.annotationData.data;
        this.submissionService.setAnnotationAtIndex(anno, this.annotationData.index);
    }

}
