import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LocusComponent} from '../locus/locus.component';
import { GeneService } from '../../services/gene.service';

@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.scss']
})
export class GenesComponent implements OnInit, AfterViewInit {


  @ViewChildren(LocusComponent) locuses: QueryList<LocusComponent>;
  numLocuses: number[] = [0];

  constructor(private geneService: GeneService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.locuses);
  }

  addLocus() {
    if (this.numLocuses.length === 0) {
      this.numLocuses.push(0);
    } else {
      this.numLocuses.push(this.numLocuses.sort()[this.numLocuses.length - 1] + 1);
    }
  }

  deleteLocus(index: number) {
    this.geneService.removeEnteredGene(this.locuses.toArray()[index].locusData);
    this.numLocuses = this.numLocuses.filter((j) => j !== index);
  }

}
