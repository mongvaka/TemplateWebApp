import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { RegisterItemComponent } from './register-item.component/register-item.component';
import { RegisterItemCustomComponent } from './register-item.component/register-item-custom.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [RegisterItemComponent],
  providers: [RegisterItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RegisterItemComponent],
})
export class RegisterComponentModule {}
