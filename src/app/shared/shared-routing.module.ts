import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubmissionComponent} from "./pages/submission/submission.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {CurationComponent} from "./pages/curation/curation.component";
import {SearchComponent} from "./pages/search/search.component";

const routes: Routes = [
    {path:'submission', component:SubmissionComponent},
    {path:'admin', component:AdminComponent},
    {path:'curation', component:CurationComponent},
    {path:'search', component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
