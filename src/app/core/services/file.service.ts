import { Injectable } from '@angular/core';
import { getExcelfileNameFormat } from 'app/shared/config/globalvar.config';
import {
  XLSX_TYPE,
  CONTENT_TYPE,
  XLS_TYPE,
  XLSX_EXTENSION,
  PDF_TYPE,
  PNG_TYPE,
  JPG_TYPE,
  JPEG_TYPE,
  GIF_TYPE,
  TXT_TYPE,
} from 'app/shared/constants';
import {
  toExportDateFormat,
  dateTimetoStringLong,
} from 'app/shared/functions/date.function';
import { setOrderingJson } from 'app/shared/functions/model.function';
import {
  base64ToByteArray,
  isNullOrUndefined,
  isUndefinedOrZeroLength,
  trimEnd,
} from 'app/shared/functions/value.function';
import {
  SearchParameter,
  IFileName,
  FileInformation,
  OptionModel,
} from 'app/shared/models/system_model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public searchParam: SearchParameter;
  // ####### export excel ########
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    if (json.length > 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
        cellDates: true,
      });
      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: XLSX_TYPE,
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: CONTENT_TYPE[XLS_TYPE] });
    const config: IFileName = getExcelfileNameFormat();
    FileSaver.saveAs(
      data,
      this.getExcelFileName(fileName, config) + XLSX_EXTENSION
    );
  }

  // input buffer => base64string
  // input fileName => fileName with extension
  saveAsFile(buffer: any, fileName: string): void {
    let contentType: string;
    let base64data: string;
    if (this.hasMimeHeader(buffer)) {
      const dataArray: string[] = buffer.split(',');
      contentType = this.getMimeHeader(dataArray[0] + ',');
      base64data = dataArray.pop();
    } else {
      base64data = buffer;
      contentType = this.getContentTypeFromFileName(fileName);
    }
    const data: Blob = this.base64toBlob(base64data, contentType);
    FileSaver.saveAs(data, fileName);
  }
  // input file name with extension
  getContentTypeFromFileName(fileName: string): string {
    const extension: string = fileName.split('.').pop().toLowerCase();
    return CONTENT_TYPE[extension];
  }
  // input base64Data without 'data:[content-type];base64,'
  base64toBlob(base64Data, contentType): Blob {
    contentType = contentType || '';
    const byteArrays = base64ToByteArray(base64Data);
    return new Blob(byteArrays, { type: contentType });
  }

  getPreviewData(file: FileInformation): string {
    const base64Data = file.base64;
    if (this.hasMimeHeader(base64Data)) {
      return base64Data;
    }
    let contentType: string = this.getMimeHeader(file.contentType);
    if (isUndefinedOrZeroLength(contentType)) {
      contentType = this.getContentTypeFromFileName(file.fileName);
    }
    return 'data:' + contentType + ';base64, ' + encodeURI(base64Data);
  }

  getPreviewBlob(file: FileInformation): Blob {
    let base64Data = file.base64;
    let contentType;
    if (this.hasMimeHeader(file.base64)) {
      const dataArray: string[] = file.base64.split(',');
      contentType = this.getMimeHeader(dataArray[0] + ',');
      base64Data = dataArray.pop();
    } else {
      contentType = this.getContentTypeFromFileName(file.fileName);
    }
    const data: Blob = this.base64toBlob(base64Data, contentType);
    return data;
  }
  getPreviewable(contentType: string): boolean {
    contentType = this.getMimeHeader(contentType);
    const fileType: string = this.getKeyFromValue(CONTENT_TYPE, contentType);

    switch (fileType) {
      case PDF_TYPE:
      case PNG_TYPE:
      case JPG_TYPE:
      case JPEG_TYPE:
      case GIF_TYPE:
        return true;

      default:
        return false;
    }
  }

  isSupportedFileType(contentType: string): boolean {
    // tslint:disable-next-line:max-line-length
    contentType =
      !isUndefinedOrZeroLength(contentType) && contentType.split(':').length > 1
        ? this.getMimeHeader(contentType)
        : contentType;

    const fileType: string = this.getKeyFromValue(CONTENT_TYPE, contentType);
    return fileType !== undefined;
  }

  isPictureType(contentType: string): boolean {
    const type = this.getMimeHeader(contentType);
    const fileType: string = this.getKeyFromValue(CONTENT_TYPE, type);
    switch (fileType) {
      case PNG_TYPE:
      case JPG_TYPE:
      case JPEG_TYPE:
      case GIF_TYPE:
        return true;

      default:
        return false;
    }
  }

  isPreviewableDocumentType(contentType: string): boolean {
    const type = this.getMimeHeader(contentType);
    const fileType: string = this.getKeyFromValue(CONTENT_TYPE, type);
    switch (fileType) {
      case TXT_TYPE:
      case PDF_TYPE:
        return true;

      default:
        return false;
    }
  }
  isFileSizeValid(fileSize: number, fileSizeLimit: number): boolean {
    // 30 MB
    return fileSize < fileSizeLimit * 1000 * 1000;
  }
  public getDisplayFileName(nameWithExt: string, description: string): string {
    if (isUndefinedOrZeroLength(description)) {
      return nameWithExt;
    }
    const splitName: string[] = nameWithExt.split('.');
    if (splitName.length > 1) {
      return description + '.' + splitName.pop();
    } else {
      return nameWithExt;
    }
  }
  isDataUrl(contentType: string): boolean {
    const array = contentType.split(':');
    if (!isUndefinedOrZeroLength(array) && array.length > 1) {
      return array[0] === 'data';
    }
    return false;
  }
  private hasMimeHeader(data: string): boolean {
    const mimeHeader = this.getMimeHeader(data);
    if (isUndefinedOrZeroLength(mimeHeader)) {
      return false;
    }
    return true;
  }

  private getKeyFromValue(object: any, value: any): string {
    return Object.keys(object).find((key) => object[key] === value);
  }

  private getMimeHeader(data: string): string {
    if (typeof data !== 'string') {
      return null;
    }
    const regArray = data.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (regArray && regArray.length) {
      return regArray[1];
    }
    return '';
  }
  //   public getExportToExcel(param: IExportParam): any {
  //     const syslistViewService = AppInjector.get(SysListViewService);
  //     const column = param.option.columns.find((f) => f.type === ColumnType.CONTROLLER);
  //     const table = isNullOrUndefined(column) ? trimEnd(param.option.key, 'GUID') : column.textKey;
  //     const isFilter = !param.option.key.includes('attachment');
  //     const controller = isFilter ? 'SysListView' : 'Attachment';
  //     syslistViewService
  //       .getExportingList(param.searchParam, controller, table, isFilter)
  //       .finally(() => {})
  //       .subscribe(
  //         (result) => {
  //           this.getResultDataToExcel(result, param.option);
  //         },
  //         (error) => {}
  //       );
  //   }
  getResultDataToExcel(result: any, option: OptionModel): any {
    const orderedJson = setOrderingJson(result.results, option);
    this.exportAsExcelFile(
      toExportDateFormat(orderedJson),
      !isNullOrUndefined(option.exportFileName)
        ? option.exportFileName
        : trimEnd(option.key, 'GUID')
    );
  }
  saveTextContentAsFile(content: string, fileName: string): void {
    const data = new Blob([content], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(data, fileName);
  }
  getExcelFileName(tableName: string, config: IFileName): string {
    let naming = config.nameFormat;
    naming = naming.replace('{{tableName}}', tableName);
    naming = naming.replace(
      '{{date}}',
      dateTimetoStringLong(new Date(), config.dateFormat)
    );
    return naming;
  }
  getDataMimeHeaderFromFileName(fileName: string): string {
    const contentType = this.getContentTypeFromFileName(fileName);
    return 'data:' + contentType + ';base64,';
  }
}
