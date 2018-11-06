import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { PublicationComponent } from './elements/publication/publication.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { GenesComponent } from './elements/genes/genes.component';
import { LocusComponent } from './elements/locus/locus.component';
import { AnnotationComponent } from './elements/annotation/annotation.component';
import { AnnotationListComponent } from './elements/annotation-list/annotation-list.component';
import { BiologicalComponent } from './elements/annotation-types/biological/biological.component';
import { MolecularComponent } from './elements/annotation-types/molecular/molecular.component';
import { MethodDropdownComponent } from './elements/method-dropdown/method-dropdown.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserAdminComponent } from './elements/user-admin/user-admin.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgbPopoverModule,
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
    UserAdminComponent
  ],
  exports: [
    HomepageComponent
  ]
})
export class SharedModule { }
