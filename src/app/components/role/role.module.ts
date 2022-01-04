import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { RoleListComponent } from './role-list.component/role-list.component';
import { RoleItemComponent } from './role-item.component/role-item.component';
import { RoleListCustomComponent } from './role-list.component/role-list-custom.component';
import { RoleItemCustomComponent } from './role-item.component/role-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [RoleListComponent, RoleItemComponent],
  providers: [RoleListCustomComponent, RoleItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RoleListComponent, RoleItemComponent],
})
export class RoleComponentModule {}
