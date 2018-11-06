import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {

  @Input() number: number;

  selectedType: FormControl = new FormControl('Molecular Function');

  genes = ['test', 'testing'];

  constructor() { }

  ngOnInit() {
  }

}
