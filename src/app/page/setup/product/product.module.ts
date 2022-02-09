import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListPage } from './product-list-page/product-list-page';
import { ProductItemPage } from './product-item-page/product-item-page';
import { ProductComponentModule } from 'app/components/product/product.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    ProductComponentModule,
  ],
  declarations: [ProductListPage, ProductItemPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductPageModule {}
