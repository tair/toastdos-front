import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from '../../accounts/services/authentication.service';
import {a, st} from '@angular/core/src/render3';


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
        isEvidenceWithOr?: boolean,
        evidenceWith?: Array<string>
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

//Any component that implements this can get validated
export interface Validatable {
  validate(): Number;
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
    currentSubmission: Submission; //defualt blank submission
    observableGenes = new BehaviorSubject<Gene[]>([]);
    observableShouldUpdate = new BehaviorSubject<Boolean>(false);
    observableSavedDraft = new BehaviorSubject<Boolean>(false);
    inCurationMode: boolean;


    constructor(private http: HttpClient, private authService: AuthenticationService) {
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
      sub.genes = [gene];
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
        this.saveDraft();
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
        this.saveDraft();
    }

    setGeneAtIndex(newGeneData: Gene, index: number)
    {
        this.currentSubmission.genes[index] = newGeneData;
        this.observableGenes.next(this.currentSubmission.genes);
        this.saveDraft();
        if (this.currentSubmission.annotations.length==0)
        {
          this.addBlankAnnotation();
        }
    }

    addBlankAnnotation()
    {
      if (this.currentSubmission.genes.length<1) {
          return;
        }
        let anno = {} as Annotation;
        let gene = this.currentSubmission.genes[0];
        anno.type = "MOLECULAR_FUNCTION";
        anno.status = "pending";
        anno.data = {"locusName": gene,
                     "locusName2" : gene,
                     "keyword" : {name:""},
                     "method" : {name:""},
                     "text" : ""
        };
        this.currentSubmission.annotations.push(anno);
        this.observableShouldUpdate.next(true);

    }

    removeAnnotationAtIndex(index: number) {
        this.currentSubmission.annotations.splice(index, 1);
        this.saveDraft();
    }

    setAnnotationAtIndex(newAnnotation: Annotation, index: number)
    {
        this.currentSubmission.annotations[index] = newAnnotation;
    }

    phraseForCode(code: string){
        if (code==='EXP') {
            return 'inferred from experiment (EXP)';
        }
        if (code==='IDA') {
            return 'inferred from direct assay (IDA)';
        }
        if (code==='IPI') {
            return 'Inferred from Physical Interaction (IPI)';
        }
        if (code==='IMP') {
            return 'Inferred from Mutant Phenotype (IMP)';
        }
        if (code==='IGI') {
            return 'Inferred from Genetic Interaction (IGI)';
        }
        if (code==='IEP') {
            return 'Inferred from Expression Pattern (IEP)';
        }
        return '';
    }

// <span class="badge badge-success">
//    <a href="http://amigo.geneontology.org/amigo/term/GO:0032542#display-lineage-tab" class="text-light" target="_blank">
//       <!-- react-text: 3730 -->GO:0032542<!-- /react-text --><!-- react-text: 3731 --> <!-- /react-text --><span class="fa fa-external-link"></span>
//    </a>
// </span>
    makeGOLink(id: string){
      let l = `<span class="badge badge-success">
               <a href="http://amigo.geneontology.org/amigo/term/${id}#display-lineage-tab" class="text-light" target="_blank">
                  ${id}<span class="fa fa-external-link"></span>
               </a>
            </span>`;
      return l;
    }
    makeECOLink(id: string){
      let l = `<span class="badge badge-success">
                <a href="http://www.evidenceontology.org/browse/#${id}" class="text-light" target="_blank">
                ${id}
                <span class="fa fa-external-link">             
                </span>
                </a>
                </span>`;
      return l;

    }
    makePOLink(id: string){
      let l = `<span class="badge badge-success">
                <a href="http://browser.planteome.org/amigo/term/${id}" class="text-light" target="_blank">${id}
                <span class="fa fa-external-link"></span></a></span>`;
      return l;
    }

    idToLink(id: string)
    {
      if (id[0]=='G')
      {
        return this.makeGOLink(id);
      }
      if (id[0]=='P')
      {
        return this.makePOLink(id);
      }
      if (id[0]=='E')
      {
        return this.makeECOLink(id);
      }
    }

    sentanceForAnnotation(annotation: Annotation, show_pending: boolean)
    {
        if (!annotation.data.locusName)
        {
            return "invalid annotation (no locus name)";
        }

        var sentance = `${annotation.data.locusName.locusName}`;
        switch (annotation.type){
            case "ANATOMICAL_LOCATION": {
                sentance += ` anatomically located in ${annotation.data.keyword['name']} `;
                sentance += this.makePOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "BIOLOGICAL_PROCESS": {
                sentance += ` involved in (biological process) ${annotation.data.keyword['name']} `;
                sentance += this.makeGOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "COMMENT": {
                sentance += ` has the following comment ${annotation.data['text']}`;
                break;
            }
            case "MOLECULAR_FUNCTION": {
                sentance += ` functions in ${annotation.data.keyword['name']} `;
                sentance += this.makeGOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "PROTEIN_INTERACTION": {
                sentance += ` interacts with ${annotation.data.locusName2.locusName}, `;
                sentance +=  this.makeECOLink(annotation.data.method['evidence_code']);
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "SUBCELLULAR_LOCATION": {
                sentance += ` located in ${annotation.data.keyword['name']}, `;
                sentance += this.makeGOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "TEMPORAL_EXPRESSION": {
                sentance += ` expressed in ${annotation.data.keyword['name']}, `;
                sentance += this.makePOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
        }
        if (annotation.data.evidenceWith){
            if(annotation.data.isEvidenceWithOr){
                sentance += ` with ${annotation.data.evidenceWith.join(' | ')}`;
            }else{
                sentance += ` with ${annotation.data.evidenceWith.join(', ')}`;
            }
        }
        if ('status' in annotation && show_pending) {
          sentance += ` - Curation Status: ${annotation.status}`;
        }
        return sentance;
    }

    //believe it or not we need two different functions because the json for these objects has different keys
    //makes you want to explode in anger as to how the backend cant return the same object with different
    //names for the same field, mainly external_id vs externalID and locusname.locusname
    sentanceForAnnotationInReview(annotation: Annotation)
    {
        if (!annotation.data.locusName)
        {
            return "invalid annotation (no locus name)";
        }

        var sentance = `${annotation.data.locusName.locusName}`;
        switch (annotation.type){
            case "ANATOMICAL_LOCATION": {
                sentance += ` anatomically located in ${annotation.data.keyword['name']} `;
                sentance += this.makePOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "BIOLOGICAL_PROCESS": {
                sentance += ` involved in (biological process) ${annotation.data.keyword['name']} `;
                sentance += this.makeGOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "COMMENT": {
                sentance += ` has the following comment ${annotation.data['text']}`;
                break;
            }
            case "MOLECULAR_FUNCTION": {
                sentance += ` functions in ${annotation.data.keyword['name']} `;
                sentance += this.makeGOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "PROTEIN_INTERACTION": {
                sentance += ` interacts with ${annotation.data.locusName2.locusName}, `;
                sentance += this.makeECOLink(annotation.data.method['evidence_code']);
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "SUBCELLULAR_LOCATION": {
                sentance += ` located in ${annotation.data.keyword['name']}, `;
                sentance += this.makeGOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
            case "TEMPORAL_EXPRESSION": {
                sentance += ` expressed in ${annotation.data.keyword['name']}, `;
                sentance += this.makePOLink(annotation.data.keyword['external_id']);
                sentance += ` ${this.phraseForCode(annotation.data.method['evidence_code'])}, `;
                sentance += `inferred from ${annotation.data.method['name']} `;
                sentance += this.makeECOLink(annotation.data.method['external_id']);
                break;
            }
        }
        if (annotation.data.evidenceWith){
            if(annotation.data.isEvidenceWithOr){
                sentance += ` with ${annotation.data.evidenceWith.join(' | ')}`;
            }else{
                sentance += ` with ${annotation.data.evidenceWith.join(', ')}`;
            }
        }
        if ('status' in annotation) {
          sentance += ` - Curation Status: ${annotation.status}`;
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
            gJson['locusName'] = g.locusName.toUpperCase().trim();
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
            a.data.locusName.locusName = a.data.locusName.locusName.toUpperCase().trim()
            if (!withStatus && a.data.locusName.locusName) {
                anno['data']['locusName'] = a.data.locusName.locusName;
            } else {
                anno['data']['locusName'] = a.data.locusName;
            }
            anno['data']['isEvidenceWithOr'] = true;
            if (a.data['evidenceWith']) {
                anno['data']['isEvidenceWithOr'] = a.data.isEvidenceWithOr;
                anno['data']['evidenceWith'] = a.data.evidenceWith;
            }
            if (a.type==="COMMENT")
            {
                anno['data']['text'] = a.data.text;
                delete anno['data']['isEvidenceWithOr'];
            } else if (a.type=="PROTEIN_INTERACTION")
            {
              delete anno['data']['isEvidenceWithOr'];
              a.data.locusName2.locusName=a.data.locusName2.locusName.toUpperCase().trim();
                if (!withStatus && a.data.locusName.locusName) {
                    anno['data']['locusName2'] = a.data.locusName2.locusName;
                } else {
                    anno['data']['locusName2'] = a.data.locusName2;
                }
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
           this.currentSubmission = next as Submission;
           this.observableShouldUpdate.next(true);
           this.observableGenes.next(this.currentSubmission.genes);
           success();
        },error1 => {
            console.log(error1);
        });
    }

    getCurrentSubmissionWithData(submissionData: Submission)
    {
           this.currentSubmission = submissionData;
           this.observableShouldUpdate.next(true);
           this.observableGenes.next(this.currentSubmission.genes);
    }

    postSubmission(success :(responce) => void, error: (responce) => void)
    {
        let url = `${environment.base_url}/submission/`;
        let body = this.toJson(false);
        console.log('postSubmission body: ',body);
        this.http.post(url,body).subscribe(next => {
            success(next);
        },error1 => {
            error(error1);
        })
    }

    saveCuration(success :(responce) => void, error: (responce) => void)
    {
        let url = `${environment.base_url}/submission/${this.currentSubmission.id}/curate`;
        console.log(this.currentSubmission);
        let body = this.toJson(true);
        console.log(body);
        this.http.post(url,body).subscribe(next => {
            success(next);
        },error1 => {
            error(error1);
        })
    }

    saveDraft()
    {
        if (this.authService.isLoggedIn && !this.inCurationMode) {
          let url = `${environment.base_url}/draft/`;
          let body = {
            'submitter_id' : this.authService.userID,
            'wip_state': JSON.stringify(this.currentSubmission)
          };
          this.http.post(url, body).subscribe(next => {
              this.observableSavedDraft.next(true);
          }, error1 => {
              console.log(error1);
              this.observableSavedDraft.next(false);
          })
        }
    }

    attemptToLoadDraft()
    {
        if (this.authService.isLoggedIn) {
          let url = `${environment.base_url}/draft/`;
          this.http.get(url).subscribe(next => {
              this.currentSubmission = JSON.parse(next as string) as Submission; //we get a string back lmao
              this.observableGenes.next(this.currentSubmission.genes);
              this.observableShouldUpdate.next(true);
          }, error1 => {
              console.log(error1);
          })
        }
    }

}
