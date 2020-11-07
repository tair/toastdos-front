import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {PublicationService} from "../../services/publication.service";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {SubmissionService, Validatable} from '../../services/submission.service';
import * as deepEqual from "deep-equal";
import {ValidationService} from '../../services/validation.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy, Validatable {

  title: string;
  author: string;
  pubStatus: string;
  isDOI: Boolean;
  url: string;
  errorReason: string;
  validationObservable: any;

  private form: FormGroup = new FormGroup({
    pub_id: new FormControl('')
  });

  @ViewChild('popover') popover;

  constructor(private pubService: PublicationService, private submissionService: SubmissionService, private validationService: ValidationService) {
    this.title = "";
    this.author = "";
    this.url = "";
    this.isDOI = false;
    this.errorReason = 'Pleas enter a PublicationID';
  }

  ngOnDestroy() {
    this.validationObservable.unsubscribe();
  }

  ngOnInit() {
    this.submissionService.observableShouldUpdate.asObservable().subscribe(shouldUpdate => {
        if (shouldUpdate) {
           this.form.setValue({'pub_id': this.submissionService.currentSubmission.publicationId});
           this.pubStatus = 'success';
        }
      });
    this.validationObservable = this.validationService.observableShouldValidateForms.asObservable().subscribe( shouldValidate => {
      let numErrorsInMe = this.validate();
      this.validationService.addToErrorList(numErrorsInMe);
    });
    if (this.submissionService.inCurationMode){
        this.form.setValue({'pub_id': this.submissionService.currentSubmission.publicationId});
    }
    if (this.submissionService.currentSubmission.publicationId.length>=2) {
        this.pubStatus = 'success';
    }
    this.getTitleAuthor(this.pub_id.value);
    this.pub_id.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(value => {
          this.pubStatus = 'loading';
          this.toggleErrorPopover();
        })
      ).subscribe((value: string) => {        
        this.getTitleAuthor(value);
      });

  }

  getTitleAuthor(value: string){
    if (value.length==0)
        {
          this.pubStatus='empty';
          this.author='';
          this.title='';
          return;
        }
    this.pubService.checkIsValid$(value)
          .subscribe((response: any)=> {
              this.submissionService.currentSubmission.publicationId = this.pub_id.value;
              this.pubStatus = 'success';
              this.toggleErrorPopover();
              if (response['type']=='doi') {
                this.isDOI = true;
                this.url = response.url
              } else {
                this.isDOI = false;
                this.title = response.title;
                this.author = response.author;
              }
            },
            error => {
              console.log(error);
              this.pubStatus = 'error';
              this.errorReason = 'Invalid pubMedID or DOI';
              this.toggleErrorPopover();
              this.title = "";
              this.author = "";
            });
  }

  validate() {
    if (this.pub_id.value.toString().length<2||this.pubStatus == 'error') {
      this.errorReason = 'You must enter a valid DOI or PubMedID';
      this.pubStatus='error';
      this.popover.close();
      this.popover.open();
      return 1;
    }
    this.submissionService.currentSubmission.publicationId = this.pub_id.value;
    return 0;
  }

  toggleErrorPopover() {
    if (this.pubStatus=='error') {
      this.popover.open();
    } else {
      this.popover.close();
    }
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

  get pub_id() {
    return this.form.get('pub_id');
  }

}
