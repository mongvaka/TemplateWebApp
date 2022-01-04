import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobRoutingModule } from './job-routing.module';
import { JobComponentModule } from 'app/components/job/job.module';
import { JobItemPage } from './job-item-page/job-item-page';
import { JobListPage } from './job-list-page/job-list-page';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobRoutingModule,
    JobComponentModule,
  ],
  declarations: [JobListPage, JobItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JobPageModule {}
