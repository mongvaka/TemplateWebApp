import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AccessRightsListComponent } from './access_rights-list.component/access_rights-list.component';
import { AccessRightsItemComponent } from './access_rights-item.component/access_rights-item.component';
import { AccessRightsListCustomComponent } from './access_rights-list.component/access_rights-list-custom.component';
import { AccessRightsItemCustomComponent } from './access_rights-item.component/access_rights-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [AccessRightsListComponent, AccessRightsItemComponent],
  providers: [AccessRightsListCustomComponent, AccessRightsItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AccessRightsListComponent, AccessRightsItemComponent],
})
export class AccessRightsComponentModule {}
