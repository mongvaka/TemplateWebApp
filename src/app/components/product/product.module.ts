import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ProductListComponent } from './product-list.component/product-list.component';
import { ProductItemComponent } from './product-item.component/product-item.component';
import { ProductListCustomComponent } from './product-list.component/product-list-custom.component';
import { ProductItemCustomComponent } from './product-item.component/product-item-custom.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [ProductListComponent, ProductItemComponent],
  providers: [ProductListCustomComponent, ProductItemCustomComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ProductListComponent, ProductItemComponent],
})
export class ProductComponentModule {}
