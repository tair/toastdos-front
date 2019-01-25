import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {SubmissionService} from "../../services/submission.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    private form: FormGroup = new FormGroup({
        searchString: new FormControl('', [
            //this.isDoiValid
        ])
    });

  constructor(private submissionService: SubmissionService){ }

  ngOnInit() {
    this.searchString.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((value:string) => {
        this.submissionService.getPageOfSubmissions(0,5)
      })
  }


  get searchString(){
      return this.form.get('searchString')
  }

}
