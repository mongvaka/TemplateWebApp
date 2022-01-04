import { id } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/services/auth.guard';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeePageModule } from './employee/employee.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./employee/employee.module').then(
        (m) => m.EmployeePageModule
      ),
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
