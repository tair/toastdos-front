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
import { SubcellularComponent } from './elements/annotation-types/subcellular/subcellular.component';
import { AnnatomicalComponent } from './elements/annotation-types/annatomical/annatomical.component';
import { TemporalComponent } from './elements/annotation-types/temporal/temporal.component';
import { ProteinInteractionComponent } from './elements/annotation-types/protein-interaction/protein-interaction.component';
import { CommentComponent } from './elements/annotation-types/comment/comment.component';
import { SearchComponent } from './pages/search/search.component';
import { SubmissionOverviewComponent } from './elements/submission-overview/submission-overview.component';
import { CurationDetailComponent } from './pages/curation-detail/curation-detail.component';
import { SearchCardComponent } from './pages/search/search-card/search-card.component';
import { CurationOverviewComponent } from './elements/curation-overview/curation-overview.component';

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
    SubmissionStatusComponent,
    SubcellularComponent,
    AnnatomicalComponent,
    TemporalComponent,
    ProteinInteractionComponent,
    CommentComponent,
    SearchComponent,
    SubmissionOverviewComponent,
    CurationDetailComponent,
    SearchCardComponent,
    CurationOverviewComponent,
  ],
  exports: [
    HomepageComponent
  ]
})
export class SharedModule { }
