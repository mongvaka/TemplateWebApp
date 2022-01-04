import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/services/auth.guard';
import { JobItemPage } from './job-item-page/job-item-page';
import { JobListPage } from './job-list-page/job-list-page';
const routes: Routes = [
  {
    path: '',
    component: JobListPage,
    // canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: JobItemPage,
    // canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
