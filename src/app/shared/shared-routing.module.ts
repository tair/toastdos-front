import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubmissionComponent} from "./pages/submission/submission.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {CurationComponent} from "./pages/curation/curation.component";
import {SearchComponent} from "./pages/search/search.component";
import {CurationDetailComponent} from "./pages/curation-detail/curation-detail.component";
import {DownloadComponent} from './pages/download/download.component';

const routes: Routes = [
    {path:'submission', component:SubmissionComponent},
    {path:'admin', component:AdminComponent},
    {path:'curation', component:CurationComponent},
    {path:'curation/detail/:id', component:CurationDetailComponent},
    {path:'search', component:SearchComponent},
    {path:'download', component:DownloadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
