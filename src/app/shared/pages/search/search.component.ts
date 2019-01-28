import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchService} from "../../services/search.service";
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


    searchResults;

  constructor(private searchService: SearchService){ }


  ngOnInit() {
    this.searchString.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((value:string) => {
          console.log(value);
          this.searchService.keywordSearch(value).subscribe(
              data => {this.searchResults = data},
              err => console.error(err)
          );
      })
  }



  get searchString(){
      return this.form.get('searchString')
  }

}
