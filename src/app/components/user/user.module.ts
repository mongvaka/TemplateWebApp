import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { UserListComponent } from './user-list.component/user-list.component';
import { UserItemComponent } from './user-item.component/user-item.component';
import { UserListCustomComponent } from './user-list.component/user-list-custom.component';
import { UserItemCustomComponent } from './user-item.component/user-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [UserListComponent, UserItemComponent],
  providers: [UserListCustomComponent, UserItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserListComponent, UserItemComponent],
})
export class UserComponentModule {}
