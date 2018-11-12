import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {

  @Input() annotationModel: any;
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  selectedType: FormControl = new FormControl('Molecular Function');


  constructor() { }

  ngOnInit() {

  }

  deleteMe() {
    this.deleted.emit(this.annotationModel);
  }

}
