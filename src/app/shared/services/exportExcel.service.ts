import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  constructor() {}

  exportToExcel(value: any): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(value);
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    const date = new Date();
    const fileName = 'example.xlsx';
    FileSaver.saveAs(data, date + ' ' + fileName);
  }
}
