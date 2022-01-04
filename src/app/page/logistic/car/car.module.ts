import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRoutingModule } from './car-routing.module';
import { CarComponentModule } from 'app/components/car/car.module';
import { CarListPage } from './car-list-page/car-list-page';
import { CarItemPage } from './car-item-page/car-item-page';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CarRoutingModule,
    CarComponentModule,
  ],
  declarations: [CarListPage, CarItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarPageModule {}
