import {Component, Input, OnInit} from '@angular/core';
import {Annotation, Gene} from 'src/app/shared/services/submission.service'


@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Input() result: any;

  type: string;
  annotation: Annotation;



  constructor() {

  }

  ngOnInit() {
    console.log(this.result);


    this.type = this.result.annotation_format;

    try {

        let gene: Gene = {
            locusName: this.result.locusSymbol.full_name,
            geneSymbol: this.result.locusSymbol.symbol,
            fullName: this.result.locus.taxon.name
        };

        this.annotation = {
            type: this.result.annotation_format,
            id: this.result.annotation_id,
            status: this.result.status_id,
            data: {
                locusName: gene
            }

        };

        if (this.annotation.type == "gene_gene_annotation") {

            this.annotation.data.locusName2 = {
                locusName: this.result.childData.locus2Symbol.full_name,
                geneSymbol: this.result.childData.locus2Symbol.symbol,
                fullName: this.result.childData.locus2.taxon.name
            };

        }
        else{
            this.annotation.data.keyword = {
                id: this.result.childData.keyword.extername_id,
                name: this.result.childData.keyword.name

            }
        }

        this.annotation.data.method = {
            id: this.result.childData.method.external_id,
            name: this.result.childData.method.name
        };

    }
    catch (err) {
        console.log(err)
    }

       console.log(this.annotation)


  };


}



