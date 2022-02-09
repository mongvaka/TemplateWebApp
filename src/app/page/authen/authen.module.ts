import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { AuthenRoutingModule } from './authen-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, AuthenRoutingModule],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthenPageModule {}
