import { Component, OnInit } from '@angular/core';
import {KeywordService} from '../../services/keyword.service'

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {
  keywordTemps: any= [];

  constructor(private keywordService: KeywordService) { }

  ngOnInit() {
    this.keywordService.allKeywordTempData$.subscribe(x=>{
        this.keywordTemps = x;
        console.log(this.keywordTemps);
    })
  }

}
