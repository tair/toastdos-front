import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


export interface Gene{
    locusName: string,
    geneSymbol: string,
    fullName: string
}

export interface Annotation{
    type: string,
    data: {
        locusName: Gene,
        locusName2?: Gene,
        text?: string,
        method?: {},
        keyword?: {},
    },
    id: number,
}


export interface Submission {
    publicationId: string,
    genes: Array<Gene>,
    annotations: Array<Annotation>
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
    submissions = {};
    currentSubmission: Submission; //defualt blank submission
    observableGenes = new BehaviorSubject<Gene[]>([]);

    constructor(private http: HttpClient) {
        this.currentSubmission = this.emptySubmission();
        this.observableGenes.next(this.currentSubmission.genes);
    }

    emptySubmission() {
      let gene = {} as Gene;
      gene.locusName = "AT2G23380";
      gene.geneSymbol = "CLF";
      gene.fullName = "CURLYLEAF";
      let anno = {} as Annotation;
      anno.type = "MOLECULAR_FUNCTION";
      anno.data = {"locusName": gene,
                    "locusName2" : gene,
                    "keyword" : {name:""},
                    "method" : {name:""},
                    "text" : ""
      };
      let sub = {} as Submission;
      sub.publicationId = "123";
      sub.genes = [gene];
      sub.annotations = [anno];
      return sub;
    }

    getPageOfSubmissions(page,limit) {
      let url = `${environment.base_url}/submission/list?page=${page}&limit=${limit}&sort_by=date&sort_dir=desc`;
      this.http.get(url).subscribe(next => {
          console.log(next['inProgress'][0]);
        this.submissions = next;
      },error1 => {
        console.log(error1);
      });
    }


    resetSubmission()
    {
        this.currentSubmission = this.emptySubmission();
    }


    addBlankGene()
    {
        this.currentSubmission.genes.push({
            locusName: "",
            geneSymbol: "",
            fullName: ""
            } as Gene);
        this.observableGenes.next(this.currentSubmission.genes);
    }

    getGeneWithLocus(locus: string)
    {
        for (let g of this.currentSubmission.genes)
        {
            if (g.locusName==locus)
            {
                return g;
            }
        }
        return null;
    }

    removeGeneAtIndex(index: number) {
        this.currentSubmission.genes.splice(index, 1);
        this.observableGenes.next(this.currentSubmission.genes);
    }

    setGeneAtIndex(newGeneData: Gene, index: number)
    {
        this.currentSubmission.genes[index] = newGeneData;
        this.observableGenes.next(this.currentSubmission.genes);
    }

    addBlankAnnotation()
    {
        let anno = {} as Annotation;
        let gene = {} as Gene;
        gene.locusName = "AT2G23380";
        gene.geneSymbol = "CLF";
        gene.fullName = "CURLYLEAF";
        anno.type = "MOLECULAR_FUNCTION";
        anno.data = {"locusName": gene,
                    "locusName2" : gene,
                    "keyword" : {name:""},
                    "method" : {name:""},
                    "text" : ""
        };
        this.currentSubmission.annotations.push(anno);

    }

    removeAnnotationAtIndex(index: number) {
        this.currentSubmission.annotations.splice(index, 1);
    }

    setAnnotationAtIndex(newAnnotation: Annotation, index: number)
    {
        this.currentSubmission.annotations[index] = newAnnotation;
    }

    sentanceForAnnotation(annotation: Annotation)
    {
        if (!annotation.data.locusName)
        {
            return "invalid annotation";
        }
        var sentance = `${annotation.data.locusName.locusName}`;
        switch (annotation.type){
            case "ANATOMICAL_LOCATION": {
                sentance += ` anatomically located in ${annotation.data.keyword['name']}, `;
                sentance += `inferred from ${annotation.data.method['name']}, `;
                break;
            }
            case "BIOLOGICAL_PROCESS": {
                sentance += ` involved in (biological process) ${annotation.data.keyword['name']}, `;
                sentance += `inferred from ${annotation.data.method['name']}, `;
                break;
            }
            case "COMMENT": {
                sentance += ` has the following comment ${annotation.data['comment']}`;
                break;
            }
            case "MOLECULAR_FUNCTION": {
                sentance += ` functions in ${annotation.data.keyword['name']}, `;
                sentance += `inferred from ${annotation.data.method['name']}, `;
                break;
            }
            case "PROTEIN_INTERACTION": {
                sentance += ` interacts with ${annotation.data.locusName2.locusName}, `;
                sentance += `inferred from ${annotation.data.method['name']}, `;
                break;
            }
            case "SUBCELLULAR_LOCATION": {
                sentance += ` located in ${annotation.data.keyword['name']}, `;
                sentance += `inferred from ${annotation.data.method['name']}, `;
                break;
            }
            case "TEMPORAL_EXPRESSION": {
                sentance += ` expressed in ${annotation.data.keyword['name']}, `;
                sentance += `inferred from ${annotation.data.method['name']}, `;
                break;
            }
        }
        return sentance;
    }

    toJson()
    {
        let j = {};
        let sub = this.currentSubmission;
        j['publicationId'] = sub.publicationId;
        j['genes'] = [];
        for (let g of sub.genes)
        {
            let gJson = {};
            gJson['locusName'] = g.locusName;
            gJson['geneSymbol'] = g.geneSymbol;
            gJson['fullName'] = g.fullName;
            j['genes'].push(gJson);
        }
        j['annotations'] = [];
        for (let a of sub.annotations)
        {
            let anno = {};
            anno['type'] = a.type;
            anno['data'] = {};
            anno['data']['locusName'] = a.data.locusName.locusName;
            anno['data']['isEvidenceWithOr'] = true;
            if (a.type==="COMMENT")
            {
                anno['data']['text'] = a.data.text;
            } else if (a.type=="PROTEIN_INTERACTION")
            {
                anno['data']['locusName2'] = a.data.locusName2.locusName;
                anno['data']['method'] = {'id': a.data['method']['id']};

            } else {
                anno['data']['keyword'] = {'id': a.data.keyword['id']};
                anno['data']['method'] = {'id': a.data.method['id']};
            }
            j['annotations'].push(anno);

        }
        return j;

    }


    getCurrentSubmissionWithId(id: string)
    {
        let url = `${environment.base_url}/submission/${id}`;
        this.http.get(url).subscribe(next=>{
            console.log(next);
           this.currentSubmission = next as Submission;
        },error1 => {
            console.log(error1);
        });
    }

    postSubmission(success :(responce) => void, error: (responce) => void)
    {
        let url = `${environment.base_url}/submission/`;
        let body = this.toJson();
        console.log(body);
        this.http.post(url,body).subscribe(next => {
            success(next);
        },error1 => {
            error(error1);
        })
    }

}
