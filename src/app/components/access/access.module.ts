import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AccessListComponent } from './access-list.component/access-list.component';
import { AccessItemComponent } from './access-item.component/access-item.component';
import { AccessListCustomComponent } from './access-list.component/access-list-custom.component';
import { AccessItemCustomComponent } from './access-item.component/access-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [AccessListComponent, AccessItemComponent],
  providers: [AccessListCustomComponent, AccessItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AccessListComponent, AccessItemComponent],
})
export class AccessComponentModule {}
