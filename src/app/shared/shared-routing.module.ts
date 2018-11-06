import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubmissionComponent} from "./pages/submission/submission.component";
import {AdminComponent} from "./pages/admin/admin.component";

const routes: Routes = [
    {path:'submission', component:SubmissionComponent},
    {path:'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
