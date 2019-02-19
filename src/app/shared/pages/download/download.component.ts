import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../environments/environment';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  downloadJSONLink(){
    return `${environment.base_url}/exports/files/otherAnnotations.json`;
  }

  downloadGAFLink(){
    return `${environment.base_url}/exports/files/reviewedGOPOAnnotations.gaf`;
  }

  downloadREADMELink(){
    return `${environment.base_url}/exports/files/README.txt`;
  }



}
