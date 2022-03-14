import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class KeywordService {

    constructor(private http: HttpClient) {

    }

    get allKeywordTempData$() {
        return this.http.get(`${environment.base_url}/keywordtemp/`);
    }
}
