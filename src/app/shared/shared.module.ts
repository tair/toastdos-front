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
import { AnnotationComponent } from './elements/annotation/annotation.component';
import { AnnotationListComponent } from './elements/annotation-list/annotation-list.component';
import { AdminComponent } from './pages/admin/admin.component';

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
    LocusComponent,
    AnnotationComponent,
    AnnotationListComponent,
    AdminComponent
  ],
  exports: [
    HomepageComponent
  ]
})
export class SharedModule { }
