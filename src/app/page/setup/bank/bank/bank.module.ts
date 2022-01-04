import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankRoutingModule } from './bank-routing.module';
import { BankComponentModule } from 'app/components/bank/bank.module';
import { BankListPage } from './bank-list-page/bank-list-page';
import { BankItemPage } from './bank-item-page/bank-item-page';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BankRoutingModule,
    BankComponentModule,
  ],
  declarations: [BankListPage, BankItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BankPageModule {}
