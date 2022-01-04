import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankRoutingModule } from './bank-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, BankRoutingModule],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BankPageModule {}
