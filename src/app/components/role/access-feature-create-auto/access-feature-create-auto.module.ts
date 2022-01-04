import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AccessFeatureCreateAutoCustomComponent } from './access-feature-create-auto/access-feature-create-auto-custom.component';
import { AccessFeatureCreateAutoComponent } from './access-feature-create-auto/access-feature-create-auto.component';
import { AccessFeatureCreateAutoService } from './access-feature-create-auto.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [AccessFeatureCreateAutoComponent],
  providers: [
    AccessFeatureCreateAutoCustomComponent,
    AccessFeatureCreateAutoService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AccessFeatureCreateAutoComponent],
})
export class AccessFeatureCreateAutoComponentModule {}
