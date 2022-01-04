import { Component, Input, OnInit } from '@angular/core';
import { KisBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-tiered-menu',
  templateUrl: './cust-tiered-menu.component.html',
  styleUrls: ['./cust-tiered-menu.component.scss'],
})
export class KisTieredMenuComponent extends KisBaseComponent implements OnInit {
  bindingConfig: any;
  bindingitem: any;
  bindinglable: any;
  bindingicon: string;
  disable: boolean;

  @Input() set listmenu(param: any) {
    this.bindingitem = param;
  }
  @Input() set disabled(param: any) {
    this.disable = param;
  }

  @Input() set label(param: any) {
    this.bindinglable = param;
  }
  @Input() set icon(param: any) {
    this.bindingicon = param;
  }

  ngOnInit(): void {}
}
