import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardEmpModule } from 'app/components/dashboard/dashboard_emp/dashboard_emp.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    DashboardEmpModule,
  ],
})
export class DashboardPageModule {}
