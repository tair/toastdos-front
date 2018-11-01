import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { PublicationComponent } from './elements/publication/publication.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import { GenesComponent } from './elements/genes/genes.component';
import { LocusComponent } from './elements/locus/locus.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgbPopoverModule
  ],
  declarations: [
    HomepageComponent,
    NavbarComponent,
    SubmissionComponent,
    PublicationComponent,
    GenesComponent,
    LocusComponent
  ],
  exports: [
    HomepageComponent
  ]
})
export class SharedModule { }
