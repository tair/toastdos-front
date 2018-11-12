import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { GeneService } from '../../services/gene.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-method-dropdown',
  templateUrl: './method-dropdown.component.html',
  styleUrls: ['./method-dropdown.component.scss']
})
export class MethodDropdownComponent implements OnInit {

  constructor(private geneService: GeneService) { }

  methods: any;
  method: any;

  @Input() annotationType: string = '';
  @Output() selectedMethod: EventEmitter<string> = new EventEmitter();

  methodFormatter = (x: any) => x.name;

  ngOnInit() {
    this.method = '';
    this.methods = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.geneService.searchMethods(term,this.annotationType))
    );
  }

  selectMethod(method: any) {
    this.method = method;
    this.selectedMethod.emit(method);
  }

}
