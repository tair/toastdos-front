import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {environment} from '../../../../environments/environment';
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
          this.searchService.keywordSearch(value).subscribe(
              data => {this.searchResults = data;
              console.log(data)},
              err => console.error(err)
          );
      })
  }



  get searchString(){
      return this.form.get('searchString')
  }

  export(){
      let resultArray: string[] = [];
      if(this.searchResults) {
          this.searchResults.forEach(value => {
              if (value.annotation_id) {
                  resultArray.push(value.annotation_id)

              }
          });
      }

      if(this.searchService && this.searchResults.length > 0){
          this.searchService.createExportFile(resultArray).subscribe(
              data=> {
                  console.log(data.toString());
                  window.open(`${environment.base_url}/exports/files/${data}`);
              },
              err => {console.log(err)}
          )
      }
  }

  isComplete(annotation){
      if(annotation.status.id ===2 && annotation.locus.names[0]){
          return true;
      }
      return false

  }

}
