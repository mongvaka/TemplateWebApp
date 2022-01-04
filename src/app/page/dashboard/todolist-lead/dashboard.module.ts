import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardModule } from 'app/components/dashboard/dashboard-lead/dashboard.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, DashboardRoutingModule, ChartModule, DashboardModule],
})
export class DashboardPageModule {}
