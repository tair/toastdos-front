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
    status?: string
}


export interface Submission {
    publicationId: string,
    genes: Array<Gene>,
    annotations: Array<Annotation>,
    id?: number,
    submitted_at?: string,
    submitter?: {
      email_address: string,
      name: string,
      orcid_id: string
    }
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
    currentSubmission: Submission; //defualt blank submission
    observableGenes = new BehaviorSubject<Gene[]>([]);
    observableShouldUpdate = new BehaviorSubject<Boolean>(false);
    inCurationMode: boolean;

    constructor(private http: HttpClient) {
        this.inCurationMode = false;
        this.currentSubmission = this.emptySubmission();
        this.observableGenes.next(this.currentSubmission.genes);
        this.observableShouldUpdate.next(false);
    }

    emptySubmission() {
      let gene = {} as Gene;
      gene.locusName = "";
      gene.geneSymbol = "";
      gene.fullName = "";
      let anno = {} as Annotation;
      anno.type = "MOLECULAR_FUNCTION";
      anno.data = {"locusName": gene,
                    "locusName2" : gene,
                    "keyword" : {name:""},
                    "method" : {name:""},
                    "text" : ""
      };
      let sub = {} as Submission;
      sub.publicationId = "";
      sub.genes = [];
      sub.annotations = [];
      return sub;
    }

    getPageOfSubmissions(page,limit) {
      let url = `${environment.base_url}/submission/list?page=${page}&limit=${limit}&sort_by=date&sort_dir=desc`;
      return this.http.get(url);
    }


    resetSubmission()
    {
        this.currentSubmission = this.emptySubmission();
        this.observableShouldUpdate.next(true);
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
        var gene = {} as Gene;
        if (this.currentSubmission.genes.length<1) {
          gene.locusName = "";
          gene.geneSymbol = "";
          gene.fullName = "";
        } else {
            gene = this.currentSubmission.genes[0]
        }
        anno.type = "MOLECULAR_FUNCTION";
        anno.status = "pending";
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
            return "invalid annotation (no locus name)";
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
        if ('status' in annotation) {
          sentance += `. Curation Status: ${annotation.status}`;
        }
        return sentance;
    }

    toJson(withStatus: boolean)
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
            anno['data']['locusName'] = a.data.locusName;
            anno['data']['isEvidenceWithOr'] = true;
            if (a.type==="COMMENT")
            {
                anno['data']['text'] = a.data.text;
            } else if (a.type=="PROTEIN_INTERACTION")
            {
                anno['data']['locusName2'] = a.data.locusName2;
                anno['data']['method'] = {'id': a.data['method']['id']};

            } else {
                anno['data']['keyword'] = {'id': a.data.keyword['id']};
                anno['data']['method'] = {'id': a.data.method['id']};
            }
            if ('status' in a && withStatus) {
              anno['status'] = a.status;
            }
            if ('id' in a){
              anno['id'] = a.id;
            }
            j['annotations'].push(anno);

        }
        return j;

    }


    getCurrentSubmissionWithId(id: string, success :() => void)
    {
        let url = `${environment.base_url}/submission/${id}`;
        this.http.get(url).subscribe(next=>{
            console.log(next);
           this.currentSubmission = next as Submission;
           this.observableShouldUpdate.next(true);
           this.observableGenes.next(this.currentSubmission.genes);
           success();
        },error1 => {
            console.log(error1);
        });
    }

    postSubmission(success :(responce) => void, error: (responce) => void)
    {
        let url = `${environment.base_url}/submission/`;
        let body = this.toJson(false);
        console.log(body);
        this.http.post(url,body).subscribe(next => {
            success(next);
        },error1 => {
            error(error1);
        })
    }

    saveCuration(success :(responce) => void, error: (responce) => void)
    {
        let url = `${environment.base_url}/submission/${this.currentSubmission.id}/curate`;
        let body = this.toJson(true);
        console.log(body);
        this.http.post(url,body).subscribe(next => {
            success(next);
        },error1 => {
            error(error1);
        })
    }

}
