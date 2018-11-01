import { Component, OnInit } from '@angular/core';
import {PublicationService} from "../../services/publication.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private pubService: PublicationService) { }

  ngOnInit() {
    // this.pubService.checkIsValid(2312)
    //   .subscribe((response: any) => {
    //     console.log(response);
    //   });
  }


}
