import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  observableShouldValidateForms = new BehaviorSubject<Boolean>(false);
  errors = [];

  constructor() {

  }

    async validateForms(onCompletion: (numErrors: number)=>void) {
      this.errors = [];
      this.observableShouldValidateForms.next(true);
      setTimeout(()=> {
        let errs = 0;
        for (let x of this.errors){
         errs += x;
        }
        onCompletion(errs);
      },500); //yeah
    }

    addToErrorList(count: number) {
      this.errors.push(count);
    }
}
