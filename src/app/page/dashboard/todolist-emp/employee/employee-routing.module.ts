import { id } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../../core/services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeItemPage } from './employee-item-page/employee-item-page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeItemPage,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
