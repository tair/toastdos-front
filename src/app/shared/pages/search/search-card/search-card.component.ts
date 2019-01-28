import {Component, Input, OnInit} from '@angular/core';
import Any = jasmine.Any;



@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Input() result: any;

  type: string;
  Gene: Standard;



  constructor() {

  }

  ngOnInit() {
    console.log(this.result);


    this.type = this.result.annotation_format;

    this.Gene = {
        id: this.result.annotation_id,
        keyword: this.result.childData.keyword.name,
        keyword_id: this.result.childData.keyword.id,
        is_obsolete: this.result.childData.keyword.is_obsolete,
        taxon: this.result.locus.taxon.name,
        full_name: this.result.locusSymbol.full_name,
        symbol: this.result.locusSymbol.symbol,
        submitter: this.result.submitter.name,
        method_id: this.result.childData.method.id,
        method_name: this.result.childData.method.name,
        specificData: null


    };
    if (this.type == "gene_gene_annotation"){

      let innerData: Gene_Gene = {
          locust2_id: null,
          keyword_id: null,
          method_name: null,
          method_id: null,
          is_obsolete: null

      };

      this.Gene.specificData = innerData
    }

  }

}

export class Standard {
    id: number;
    keyword: string;
    taxon: string;
    full_name: string;
    symbol: string;
    submitter: string;
    specificData: any;
    is_obsolete: boolean;
    keyword_id: string;
    method_id: string;
    method_name: string;

}

export class Gene_Gene {
    locust2_id: number;
    is_obsolete: boolean;
    keyword_id: string;
    method_id: string;
    method_name: string;


}

export class Gene_Term{
    keyword: this.result.childData.keyword.name,
    keyword_id: this.result.childData.keyword.id,
    is_obsolete: this.result.childData.keyword.is_obsolete,

}

