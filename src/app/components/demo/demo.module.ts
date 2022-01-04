import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoItemComponent } from './demo-item/demo-item.component';
import { DemoListComponent } from './demo-list/demo-list.component';



@NgModule({
  declarations: [
    DemoItemComponent,
    DemoListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DemoModule { }
