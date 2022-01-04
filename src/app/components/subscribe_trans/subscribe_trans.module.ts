import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SubscribeTransListComponent } from './subscribe_trans-list.component/subscribe_trans-list.component';
import { SubscribeTransItemComponent } from './subscribe_trans-item.component/subscribe_trans-item.component';
import { SubscribeTransListCustomComponent } from './subscribe_trans-list.component/subscribe_trans-list-custom.component';
import { SubscribeTransItemCustomComponent } from './subscribe_trans-item.component/subscribe_trans-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [SubscribeTransListComponent, SubscribeTransItemComponent],
  providers: [SubscribeTransListCustomComponent, SubscribeTransItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SubscribeTransListComponent, SubscribeTransItemComponent],
})
export class SubscribeTransComponentModule {}
