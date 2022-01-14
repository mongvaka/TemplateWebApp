import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'app/shared/functions/value.function';
import { CustBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-listbox',
  templateUrl: './cust-listbox.component.html',
  styleUrls: ['./cust-listbox.component.scss'],
})
export class CustListboxComponent extends CustBaseComponent implements OnInit {
  testdata = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'France', code: 'FR' },
  ];
  bindingModel: string;
  validateModel: any;
  bindingList: any[] = this.testdata;
  @Input() set CustModel(param: string) {
    this.bindingModel = isNullOrUndefined(param) ? '' : param;
    this.validateModel(this.bindingModel);
  }

  get CustModel(): string {
    return this.bindingModel;
  }
  ngOnInit(): void {}
}
