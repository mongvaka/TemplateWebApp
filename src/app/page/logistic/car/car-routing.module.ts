import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarItemPage } from './car-item-page/car-item-page';
import { CarListPage } from './car-list-page/car-list-page';
const routes: Routes = [
  {
    path: '',
    component: CarListPage,
  },
  {
    path: ':id',
    component: CarItemPage,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}
