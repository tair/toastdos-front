import {Component, Input, OnInit} from '@angular/core';
import {Annotation, Gene} from 'src/app/shared/services/submission.service'


@Component({
  selector: '[app-search-card]',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Input() result: any;

  type: string;
  completeAnnotation: any;



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

        this.completeAnnotation = {

            name: this.result.locus.names[0].locus_name,
            annotation: {
                type: this.result.annotation_format,
                id: this.result.annotation_id,
                status: this.result.status_id,
                data: {
                    locusName: gene
                }
            },

            submitter_name: this.result.submitter.name,
            date: this.result.updated_at,
            pub_id: null

        };

        if (this.result.publication.pubmed_id){
            this.completeAnnotation.pub_id = this.result.publication.pubmed_id
        }
        else{
            this.completeAnnotation.pub_id = this.result.publication.doi
        }


        if (this.result.childData.locus2) {

            this.completeAnnotation.annotation.data.locusName2 = {
                locusName: this.result.childData.locus2Symbol.full_name,
                geneSymbol: this.result.childData.locus2Symbol.symbol,
                fullName: this.result.childData.locus2.taxon.name
            };

        }
        else{
            this.completeAnnotation.annotation.data.keyword = {
                id: this.result.childData.keyword.extername_id,
                name: this.result.childData.keyword.name,
                external_id: this.result.childData.keyword.external_id,
                type: this.result.childData.keyword.keywordType.name

            }
        }

        if(this.result.childData.method) {
            this.completeAnnotation.annotation.data.method = {
                id: this.result.childData.method.external_id,
                name: this.result.childData.method.name,
                evidence: this.result.childData.method.keywordMapping.evidence_code
            };
        }

    }
    catch (err) {
    }
  };


}


export interface CompleteAnnotation{
    name: String
    annotation: Annotation,
    submitter_name: String,
    date: String,
    pub_id: Number

}


