import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { PublicationComponent } from './elements/publication/publication.component';
import {NgbPopoverModule ,NgbTypeaheadModule, NgbProgressbarModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from '@angular/forms';
import { GenesComponent } from './elements/genes/genes.component';
import { LocusComponent } from './elements/locus/locus.component';
import { AnnotationComponent } from './elements/annotation/annotation.component';
import { AnnotationListComponent } from './elements/annotation-list/annotation-list.component';
import { BiologicalComponent } from './elements/annotation-types/biological/biological.component';
import { MolecularComponent } from './elements/annotation-types/molecular/molecular.component';
import { MethodDropdownComponent } from './elements/method-dropdown/method-dropdown.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserAdminComponent } from './elements/user-admin/user-admin.component';
import { CurationComponent } from './pages/curation/curation.component';
import { SubmissionStatusComponent } from './elements/submission-status/submission-status.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbProgressbarModule,
    NgbTypeaheadModule

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
    BiologicalComponent,
    MolecularComponent,
    MethodDropdownComponent,
    AdminComponent,
    UserAdminComponent,
    CurationComponent,
    SubmissionStatusComponent
  ],
  exports: [
    HomepageComponent
  ]
})
export class SharedModule { }
