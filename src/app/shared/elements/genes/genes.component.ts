import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LocusComponent} from "../locus/locus.component";

@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.scss']
})
export class GenesComponent implements OnInit, AfterViewInit {


  @ViewChildren(LocusComponent) locuses: QueryList<LocusComponent>;
  numLocuses: number[] = [0];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.locuses);
  }

  addLocus() {
    if (this.numLocuses.length==0) {
      this.numLocuses.push(0);
    } else {
      this.numLocuses.push(this.numLocuses.sort()[this.numLocuses.length - 1] + 1);
    }
  }

  deleteLocus(index: number) {
    this.numLocuses = this.numLocuses.filter((j) => j!= index);
  }

}
