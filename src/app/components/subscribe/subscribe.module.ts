import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SubscribeListComponent } from './subscribe-list.component/subscribe-list.component';
import { SubscribeItemComponent } from './subscribe-item.component/subscribe-item.component';
import { SubscribeListCustomComponent } from './subscribe-list.component/subscribe-list-custom.component';
import { SubscribeItemCustomComponent } from './subscribe-item.component/subscribe-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [SubscribeListComponent, SubscribeItemComponent],
  providers: [SubscribeListCustomComponent, SubscribeItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SubscribeListComponent, SubscribeItemComponent],
})
export class SubscribeComponentModule {}
