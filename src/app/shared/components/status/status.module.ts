import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StatusListComponent } from './status-list.component/status-list.component';
import { StatusItemComponent } from './status-item.component/status-item.component';
import { StatusListCustomComponent } from './status-list.component/status-list-custom.component';
import { StatusItemCustomComponent } from './status-item.component/status-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [StatusListComponent, StatusItemComponent],
  providers: [StatusListCustomComponent, StatusItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [StatusListComponent, StatusItemComponent],
})
export class StatusComponentModule {}
