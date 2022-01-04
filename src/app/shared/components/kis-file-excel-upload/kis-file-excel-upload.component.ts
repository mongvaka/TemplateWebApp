import { title } from 'process';
import * as XLSX from 'ts-xlsx';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { AppConst, ColumnType } from 'app/shared/constants';
import { isNullOrUndefined, Uuid } from 'app/shared/functions/value.function';
import {
  InputTextConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { KisBaseComponent } from '../cust-base/cust-base';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-file-excel-upload',
  templateUrl: './cust-file-excel-upload.component.html',
  styleUrls: ['./cust-file-excel-upload.component.scss'],
})
export class KisFileExcelUploadComponent
  extends KisBaseComponent
  implements OnInit
{
  arrayBuffer: any;
  file: File;
  Arry: any[];
  colum: any[];
  Files = '';
  bindingModel: any;
  bindingChange: any;

  @Input() set kisModel(param: string) {
    console.log(param);
    this.bindingModel = param;
  }
  onChange(event: any): void {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var datatow = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.Arry = datatow;
      var title = [];
      var key = Object.keys(datatow[0]);
      for (let i = 0; i < key.length; i++) {
        title.push(key[i]);
      }
      this.colum = title;
      this.bindingModel = datatow;
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}
