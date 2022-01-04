import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { KisBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-listbox',
  templateUrl: './cust-listbox.component.html',
  styleUrls: ['./cust-listbox.component.scss'],
})
export class KisListboxComponent extends KisBaseComponent implements OnInit {
  testdata = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'France', code: 'FR' },
  ];
  bindingModel: string;
  validateModel: any;
  bindingList: any[] = this.testdata;
  @Input() set kisModel(param: string) {
    this.bindingModel = isNullOrUndefined(param) ? '' : param;
    this.validateModel(this.bindingModel);
  }

  get kisModel(): string {
    return this.bindingModel;
  }
  ngOnInit(): void {}
}
