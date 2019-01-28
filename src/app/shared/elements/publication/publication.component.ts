import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {PublicationService} from "../../services/publication.service";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {SubmissionService} from "../../services/submission.service";
import * as deepEqual from "deep-equal";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  title: string;
  author: string;
  pubStatus: string;
  isDOI: Boolean;
  url: string;

  private form: FormGroup = new FormGroup({
    pub_id: new FormControl('', [
      //this.isDoiValid
    ])
  });

  @ViewChild('popover') popover;

  constructor(private pubService: PublicationService, private submissionService: SubmissionService) {
    this.title = "";
    this.author = "";
    this.url = "";
    this.isDOI = false;
  }


  ngOnInit() {
    this.submissionService.observableShouldUpdate.asObservable().subscribe(shouldUpdate => {
        if (shouldUpdate) {
           this.form.setValue({'pub_id': this.submissionService.currentSubmission.publicationId});
           this.pubStatus = 'success';
        }
      });
    this.form.setValue({'pub_id': this.submissionService.currentSubmission.publicationId});
    if (this.submissionService.currentSubmission.publicationId.length>=2) {
        this.pubStatus = 'success';
    }
    this.pub_id.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(value => {
          this.pubStatus = 'loading';
          this.toggleErrorPopover();
        })
      ).subscribe((value: string) => {
        this.pubService.checkIsValid$(value)
          .subscribe((response: any)=> {
              this.submissionService.currentSubmission.publicationId = this.pub_id.value;
              this.pubStatus = 'success';
              this.toggleErrorPopover();
              console.log(response);
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
              this.toggleErrorPopover();
              this.title = "";
              this.author = "";
            });
      });

  }

  checkValid() {
    this.pubService.checkIsValid$(this.submissionService.currentSubmission.publicationId)
                .subscribe((response: any)=> {
                  this.pubStatus = 'success';
                  this.toggleErrorPopover();
                  this.title = response.title;
                  this.author = response.author;
                  },
                error => {
                  console.log(error);
                  this.pubStatus = 'error';
                  this.toggleErrorPopover();
                  this.title = "";
                  this.author = "";
                });
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
