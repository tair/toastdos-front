import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

    private annotations: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor() { }

    addAnnotation(anno: any) {
        const temp = this.annotations.value;
        temp.push(anno);
        this.annotations.next(temp); //kinda weird but since annotations is an observable the next value we want
        //is the array plus what we are adding
    }

    removeAnnotation(index: number) {
        this.annotations.next(this.annotations.value.filter((anno,listIndex) => listIndex !== index));
    }

    get getAnnotations$(): Observable<any[]> {
        return this.annotations.asObservable();
    }
}
