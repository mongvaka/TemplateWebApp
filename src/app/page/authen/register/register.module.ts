import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RegisterItemPage } from './register-item-page/register-item-page';
import { RegisterComponentModule } from 'app/components/register/register.module';
import { RegisterPageRoutingModule } from './register-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterPageRoutingModule,
    RegisterComponentModule,
  ],
  declarations: [RegisterItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterPageModule {}
