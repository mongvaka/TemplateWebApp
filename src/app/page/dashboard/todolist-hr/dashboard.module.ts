import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardHrModule } from 'app/components/dashboard/dashboard_hr/dashboard_hr.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    DashboardHrModule,
  ],
})
export class DashboardPageModule {}
