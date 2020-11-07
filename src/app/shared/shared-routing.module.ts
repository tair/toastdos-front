import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubmissionComponent} from "./pages/submission/submission.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {CurationComponent} from "./pages/curation/curation.component";
import {SearchComponent} from "./pages/search/search.component";
import {CurationDetailComponent} from "./pages/curation-detail/curation-detail.component";
import {DownloadComponent} from './pages/download/download.component';
import {CurationDetailResolverService} from './services/curation-detail-resolver.service';
import { AuthGuardService as AuthGuard } from '../accounts/services/auth-guard.service';

const routes: Routes = [
    {path:'submission', component:SubmissionComponent, canActivate:[AuthGuard]},
    {path:'admin', component:AdminComponent, canActivate:[AuthGuard]},
    {path:'curation', component:CurationComponent, canActivate:[AuthGuard]},
    {path:'curation/detail/:id', component:CurationDetailComponent, resolve:{submission:CurationDetailResolverService}, canActivate:[AuthGuard]},
    // {path:'search', component:SearchComponent},
    {path:'download', component:DownloadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
