import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResponseContentType} from '@angular/http';

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

  constructor(private searchService: SearchService, private http: HttpClient){
    this.searchResults=[];
  }


  ngOnInit() {
    this.searchString.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((value:string) => {
          this.searchService.keywordSearch(value).subscribe(
              data => {this.searchResults = data;},
              err => {
                            console.error(err);
                            this.searchResults = [];
                            }
          );
      })
  }

  downloadSearchResults()
  {
    let anno_ids = "";
    for (let x of this.searchResults)
    {
      anno_ids = anno_ids+`${x.id},`
    }
    anno_ids = anno_ids.substring(0,anno_ids.length-1); //delete the last comma;
    let url = `${environment.base_url}/searchexport/${anno_ids}`;
    this.http.get(url).subscribe(
      value => {
        let dowload_url = `${environment.base_url}/exports/files/${value}`;
        var link = document.createElement('a');
        link.href = dowload_url;
        link.download = 'search_export.gaf';
        link.click();
      });
  }


  get searchString(){
      return this.form.get('searchString')
  }

}
