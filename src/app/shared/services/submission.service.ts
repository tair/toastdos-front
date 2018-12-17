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
    submissions = new BehaviorSubject<any>([]);
    currentSubmission = new BehaviorSubject<Submission>(this.emptySubmission()); //defualt blank submission
    currentGenes = new BehaviorSubject<Array<Gene>>([]);

    constructor(private http: HttpClient) {
        this.setSubmission(this.emptySubmission());
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
      sub.publicationId = "";
      sub.genes = [gene];
      sub.annotations = [anno];
      return sub;
    }

    getPageOfSubmissions(page,limit) {
      let url = `${environment.base_url}/submission/list?page=${page}&limit=${limit}&sort_by=date&sort_dir=desc`
      this.http.get(url).subscribe(next => {
          console.log(next['inProgress'][0]);
        this.submissions.next(next);
      },error1 => {
        console.log(error1);
      })
    }

    currentSubmissionValue()
    {
        return this.currentSubmission.value;
    }

    get currentGenes$()
    {
        return this.currentGenes.asObservable();
    }

    get currentSubmission$()
    {
      return this.currentSubmission.asObservable();
    }

    resetSubmission()
    {
        this.currentGenes.next([]);
        this.currentSubmission.next(this.emptySubmission());
    }


    setSubmission(newSubmission: Submission)
    {
        this.currentGenes.next(newSubmission.genes);
        this.currentSubmission.next(newSubmission);
    }

    setPublication(newPubID: string)
    {
        this.currentSubmission.value.publicationId = newPubID;
        this.setSubmission(this.currentSubmission.value);
    }


    addBlankGene()
    {
        this.currentSubmission.value.genes.push({
            locusName: "",
            geneSymbol: "",
            fullName: ""
            } as Gene);
        this.setSubmission(this.currentSubmission.value);

    }

    getGeneAtIndex(index: number)
    {
        return this.currentSubmission.value.genes[index];
    }

    getGeneWithLocus(locus: string)
    {
        for (let g of this.currentSubmission.value.genes)
        {
            if (g.locusName==locus)
            {
                return g;
            }
        }
        return null;
    }

    removeGeneAtIndex(index: number) {
        this.currentSubmission.value.genes.splice(index, 1);
        this.setSubmission(this.currentSubmission.value);
    }

    setGeneAtIndex(newGeneData: Gene, index: number)
    {
        this.currentSubmission.value.genes[index] = newGeneData;
        this.setSubmission(this.currentSubmission.value);
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
        this.currentSubmission.value.annotations.push(anno);
        this.setSubmission(this.currentSubmission.value);

    }

    removeAnnotationAtIndex(index: number) {
        this.currentSubmission.value.annotations.splice(index, 1);
        this.setSubmission(this.currentSubmission.value);
    }

    setAnnotationAtIndex(newAnnotation: Annotation, index: number)
    {
        this.currentSubmission.value.annotations[index] = newAnnotation;
        this.setSubmission(this.currentSubmission.value);
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
        let sub = this.currentSubmissionValue();
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
           this.setSubmission(next as Submission);
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
