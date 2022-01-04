import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormatConfig } from '../config/format.config';
import { ColumnType, MaskType } from '../constants';
import {
  isNullOrUndefined,
  isNullOrUndefOrEmpty,
  replaceAll,
} from '../functions/value.function';
import { ColumnModel } from '../models/system_model';

@Pipe({ name: 'dataDisplay' })
export class DataDisplay implements PipeTransform {
  transform(
    value: any,
    column: ColumnModel,
    format: any = FormatConfig.INTEGER,
    index = 0
  ): any {
    if (column.type === ColumnType.MASTER || column.type === ColumnType.ENUM) {
      if (column === undefined) {
        return value;
      } else if (isNullOrUndefined(column.masterList)) {
        return value;
      }
      if (value === undefined || value === null) {
        return '';
      }
      let item;
      switch (column.type) {
        case ColumnType.MASTER:
          item = column.masterList.filter((f) => f.value === value)[0];
          if (item === undefined) {
            return value;
          } else {
            return item.label;
          }
        case ColumnType.ENUM:
          item = column.masterList.filter(
            (f) => f.value.toString() === value.toString()
          )[0];
          if (item === undefined) {
            return value;
          } else {
            return item.label;
          }
        default:
          return value;
      }
    } else if (
      column.type === ColumnType.DECIMAL ||
      column.type === ColumnType.INT
    ) {
      value =
        this.setPrecisionFormatter(value, format) === null
          ? value
          : this.setPrecisionFormatter(value, format);
      value =
        this.setThousandSeperate(value, format) === null
          ? value
          : this.setThousandSeperate(value, format);
      value =
        this.setPercentFormatter(value, format) === null
          ? value
          : this.setPercentFormatter(value, format);
      return value;
    } else if (column.type === ColumnType.BOOLEAN) {
      if (value) {
        return this._sanitizer.bypassSecurityTrustHtml(
          `<p-checkbox binary="true" inputId="binary"></p-checkbox>`
        );
      } else {
        return this._sanitizer.bypassSecurityTrustHtml(
          `<p-checkbox binary="true" inputId="binary"></p-checkbox>`
        );
      }
    } else {
      return isNullOrUndefOrEmpty(value)
        ? value
        : this.replaceHTML(value.toString());
    }
  }
  constructor(private _sanitizer: DomSanitizer) {}
  setPercentFormatter(value: string, format: any): string {
    if (isNullOrUndefOrEmpty(value)) {
      return '0';
    }
    if (format === MaskType.PERCENT) {
      return value.toString().concat('%');
    } else {
      return value.toString();
    }
  }
  setPrecisionFormatter(value: string, format: any): string {
    if (isNullOrUndefOrEmpty(value)) {
      return '0';
    }
    if (format === ColumnType.DECIMAL) {
      if (value.toString().includes('.')) {
        const arr = value.toString().split('.');
        if (arr[1].length < 2) {
          return Number(value).toFixed(2).toString();
        } else {
          return value;
        }
      } else {
        return Number(value).toFixed(2).toString();
      }
    } else {
      return value;
    }
  }
  setThousandSeperate(value: string, format: any): string {
    if (isNullOrUndefOrEmpty(value)) {
      return '0';
    }
    if (format === ColumnType.DECIMAL) {
      if (value.toString().includes('.')) {
        const arr = value.toString().split('.');
        arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return arr[0].concat('.', arr[1]);
      } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } else {
      return value;
    }
  }
  replaceHTML(str: string): string {
    try {
      if (!isNullOrUndefOrEmpty(str)) {
        str = replaceAll(str, '&', '&#38;');
        str = replaceAll(str, '<', '&#60;');
        str = replaceAll(str, '>', '&#62;');
      }
      return str;
    } catch (error) {
      return error;
    }
  }
}

// @Pipe({ name: 'dataDisplayvw' })
// export class DataDisplayvw implements PipeTransform {
//   transform(row: any, column: ColumnModel, format: any = FormatConfig.INTEGER, index = 0): any {
//     if (column.type === ColumnType.MASTER || column.type === ColumnType.ENUM) {
//       const value = row[column.textKey];
//       if (column === undefined) {
//         return value;
//       } else if (isNullOrUndefined(column.masterList)) {
//         return value;
//       }
//       if (value === undefined || value === null) {
//         return '';
//       }
//       let item;
//       switch (column.type) {
//         case ColumnType.MASTER:
//           item = column.masterList.filter((f) => f.value === value)[0];
//           if (item === undefined) {
//             return value;
//           } else {
//             return item.label;
//           }
//         case ColumnType.ENUM:
//           item = column.masterList.filter((f) => f.value.toString() === value.toString())[0];
//           if (item === undefined) {
//             return value;
//           } else {
//             return item.label;
//           }
//         default:
//           return value;
//       }
//     } else if (column.type === ColumnType.DECIMAL || column.type === ColumnType.INT) {
//       let value = row[column.textKey];
//       value = this.setPrecisionFormatter(value, format) === null ? value : this.setPrecisionFormatter(value, format);
//       value = this.setThousandSeperate(value, format) === null ? value : this.setThousandSeperate(value, format);
//       value = this.setPercentFormatter(value, format) === null ? value : this.setPercentFormatter(value, format);
//       return value;
//     } else if (column.type === ColumnType.BOOLEAN) {
//       // const value = row[column.textKey];
//       // if (value) {
//       //   return this._sanitizer.bypassSecurityTrustHtml(`<label class="ck-container">
//       //   <input type="checkbox" checked="checked" onclick="return false;">
//       //   <span class="checkmark"></span>
//       // </label>`);
//       // } else {
//       //   return this._sanitizer.bypassSecurityTrustHtml(`<label class="ck-container">
//       //   <input type="checkbox" onclick="return false;">
//       //   <span class="checkmark"></span>
//       // </label>`);
//       // }
//       return '';
//     } else if (column.type === ColumnType.DATE || column.type === ColumnType.DATERANGE) {
//       const value = row[`${column.textKey}vw`];
//       return value;
//     } else {
//       const value = row[column.textKey];
//       return isNullOrUndefOrEmpty(value) ? value : this.replaceHTML(value.toString());
//     }
//   }
//   constructor(private _sanitizer: DomSanitizer) {}
//   setPercentFormatter(value: string, format: any): string {
//     if (isNullOrUndefOrEmpty(value)) {
//       return '0';
//     }
//     if (format === MaskType.PERCENT) {
//       return value.toString().concat('%');
//     } else {
//       return value.toString();
//     }
//   }
//   setPrecisionFormatter(value: string, format: any): string {
//     if (isNullOrUndefOrEmpty(value)) {
//       return '0';
//     }
//     if (format > ColumnType.DECIMAL) {
//       if (value.toString().includes('.')) {
//         const arr = value.toString().split('.');
//         if (arr[1].length < 2) {
//           return Number(value).toFixed(2).toString();
//         } else {
//           return value;
//         }
//       } else {
//         return Number(value).toFixed(2).toString();
//       }
//     } else {
//       return value;
//     }
//   }
//   setThousandSeperate(value: string, format: any): string {
//     if (isNullOrUndefOrEmpty(value)) {
//       return '0';
//     }
//     if (format === ColumnType.DECIMAL) {
//       if (value.toString().includes('.')) {
//         const arr = value.toString().split('.');
//         arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//         return arr[0].concat('.', arr[1]);
//       } else {
//         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//       }
//     } else {
//       return value;
//     }
//   }
//   replaceHTML(str: string): string {
//     try {
//       if (!isNullOrUndefOrEmpty(str)) {
//         str = replaceAll(str, '&', '&#38;');
//         str = replaceAll(str, '<', '&#60;');
//         str = replaceAll(str, '>', '&#62;');
//       }
//       return str;
//     } catch (error) {}
//   }
// }
