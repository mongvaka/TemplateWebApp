import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { BankListComponent } from './bank-list.component/bank-list.component';
import { BankItemComponent } from './bank-item.component/bank-item.component';
import { BankListCustomComponent } from './bank-list.component/bank-list-custom.component';
import { BankItemCustomComponent } from './bank-item.component/bank-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [BankListComponent, BankItemComponent],
  providers: [BankListCustomComponent, BankItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BankListComponent, BankItemComponent],
})
export class BankComponentModule {}
