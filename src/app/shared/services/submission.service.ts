import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export interface Annotation{
    type: string,
    data: {}
}

export interface Gene{
    locusName: string,
    geneSymbol: string,
    fullName: string
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
    constructor(private http: HttpClient) {

    }

    emptySubmission() {
      let gene = {} as Gene;
      gene.locusName = "AT2G23380";
      gene.geneSymbol = "CLF";
      gene.fullName = "CURLY_LEAF";
      let anno = {} as Annotation;
      anno.data = {};
      anno.type = "Molecular Function";
      let sub = {} as Submission;
      sub.publicationId = "2341";
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

    get currentSubmission$()
    {
      return this.currentSubmission.asObservable();
    }

    resetSubmission()
    {
        this.currentSubmission.next(this.emptySubmission());
    }


    setSubmission(newSubmission: Submission)
    {
      this.currentSubmission.next(newSubmission);
    }

    setPublication(newPubID: string)
    {
        this.currentSubmission.value.publicationId = newPubID;
        this.setSubmission(this.currentSubmission.value);
    }

    setGeneAtIndex(newGeneData: Gene, index: number)
    {
        this.currentSubmission.value.genes[index] = newGeneData;
        this.setSubmission(this.currentSubmission.value);
    }
    setAnnotationAtIndex(newAnnotation: Annotation, index: number)
    {
        this.currentSubmission.value.annotations[index] = newAnnotation;
        this.setSubmission(this.currentSubmission.value);
    }

    getGeneAtIndex(index: number)
    {
        return this.currentSubmission.value.genes[index];
    }

    sentanceForAnnotation(annotation: Annotation)
    {
        if (!annotation.data['gene1'])
        {
            return "invalid annotation";
        }
        var sentance = `${annotation.data['gene1'].locusName}`;
        switch (annotation.type){
            case "ANATOMICAL_LOCATION": {
                sentance += ` anatomically located in ${annotation.data['function'].name}, `;
                sentance += `inferred from ${annotation.data['method'].name}, `;
                break;
            }
            case "BIOLOGICAL_PROCESS": {
                sentance += ` involved in (biological process) ${annotation.data['function'].name}, `;
                sentance += `inferred from ${annotation.data['method'].name}, `;
                break;
            }
            case "COMMENT": {
                sentance += ` has the following comment ${annotation.data['comment']}`;
                break;
            }
            case "MOLECULAR_FUNCTION": {
                sentance += ` functions in ${annotation.data['function'].name}, `;
                sentance += `inferred from ${annotation.data['method'].name}, `;
                break;
            }
            case "PROTEIN_INTERACTION": {
                sentance += ` interacts with ${annotation.data['gene2'].locusName}, `;
                sentance += `inferred from ${annotation.data['method'].name}, `;
                break;
            }
            case "SUBCELLULAR_LOCATION": {
                sentance += ` located in ${annotation.data['function'].name}, `;
                sentance += `inferred from ${annotation.data['method'].name}, `;
                break;
            }
            case "TEMPORAL_EXPRESSION": {
                sentance += ` expressed in ${annotation.data['function'].name}, `;
                sentance += `inferred from ${annotation.data['method'].name}, `;
                break;
            }
        }
        return sentance;
    }

}
