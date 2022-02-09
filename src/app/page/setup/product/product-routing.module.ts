import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemPage } from './product-item-page/product-item-page';
import { ProductListPage } from './product-list-page/product-list-page';

const routes: Routes = [
  {
    path: '',
    component: ProductListPage,
  },
  {
    path: ':id',
    component: ProductItemPage,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
