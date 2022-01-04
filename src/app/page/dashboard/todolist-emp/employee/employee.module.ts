import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponentModule } from 'app/components/employee/employee.module';
import { EmployeeItemPage } from './employee-item-page/employee-item-page';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
    EmployeeComponentModule,
  ],
  declarations: [EmployeeItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeePageModule {}
