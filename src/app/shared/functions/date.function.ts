import { DatePipe } from '@angular/common';
import {
  getInputDateFormat,
  getInputDateTimeFormat,
} from '../config/globalvar.config';
import { isNullOrUndefined } from './value.function';

export function dateTimetoString(date: Date): string {
  const dateTimePipeFormat = getInputDateTimeFormat();
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(date, dateTimePipeFormat);
}

export function datetoString(date: Date): string {
  const datePipeFormat = getInputDateFormat();
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(date, datePipeFormat);
}

export function datetoStringCustom(date: string): string {
  date = date.replace('-', '/').replace('-', '/');
  return date;
}

export function stringToDate(str: string): Date {
  if (str === null) {
    return null;
  }
  const datePipeFormat = getInputDateFormat();
  const arrFormat = datePipeFormat.split('/');
  const arrParam = str.split('/');
  let strDate = '';
  if (arrFormat[0].toUpperCase().includes('Y')) {
    strDate = `${arrParam[0]}-`;
  } else if (arrFormat[1].toUpperCase().includes('Y')) {
    strDate = `${arrParam[1]}-`;
  } else if (arrFormat[2].toUpperCase().includes('Y')) {
    strDate = `${arrParam[2]}-`;
  }
  if (arrFormat[0].toUpperCase().includes('M')) {
    strDate = `${strDate}${arrParam[0]}-`;
  } else if (arrFormat[1].toUpperCase().includes('M')) {
    strDate = `${strDate}${arrParam[1]}-`;
  } else if (arrFormat[2].toUpperCase().includes('M')) {
    strDate = `${strDate}${arrParam[2]}-`;
  }
  if (arrFormat[0].toUpperCase().includes('D')) {
    strDate = `${strDate}${arrParam[0]}T00:00:00`;
  } else if (arrFormat[1].toUpperCase().includes('D')) {
    strDate = `${strDate}${arrParam[1]}T00:00:00`;
  } else if (arrFormat[2].toUpperCase().includes('D')) {
    strDate = `${strDate}${arrParam[2]}T00:00:00`;
  }
  return new Date(strDate);
}

export function stringToDateTime(str: string): Date {
  const datePipeFormat = getInputDateTimeFormat();
  const arrFormat = datePipeFormat.split(/[/ :]/);
  const arrParam = str.split(/[/ :]/);
  let strDate = '';
  if (arrFormat[0].toUpperCase().includes('Y')) {
    strDate = `${arrParam[0]}-`;
  } else if (arrFormat[1].toUpperCase().includes('Y')) {
    strDate = `${arrParam[1]}-`;
  } else if (arrFormat[2].toUpperCase().includes('Y')) {
    strDate = `${arrParam[2]}-`;
  }
  if (arrFormat[0].toUpperCase().includes('M')) {
    strDate = `${strDate}${arrParam[0]}-`;
  } else if (arrFormat[1].toUpperCase().includes('M')) {
    strDate = `${strDate}${arrParam[1]}-`;
  } else if (arrFormat[2].toUpperCase().includes('M')) {
    strDate = `${strDate}${arrParam[2]}-`;
  }
  if (arrFormat[0].toUpperCase().includes('D')) {
    strDate = `${strDate}${arrParam[0]}T${arrParam[3]}:${arrParam[4]}:${arrParam[5]}`;
  } else if (arrFormat[1].toUpperCase().includes('D')) {
    strDate = `${strDate}${arrParam[1]}T${arrParam[3]}:${arrParam[4]}:${arrParam[5]}`;
  } else if (arrFormat[2].toUpperCase().includes('D')) {
    strDate = `${strDate}${arrParam[2]}T${arrParam[3]}:${arrParam[4]}:${arrParam[5]}`;
  }
  return new Date(strDate);
}

export function isDateFromGreaterThanDateTo(
  dateFrom: string,
  dateTo: string
): boolean {
  let result = false;

  if (!isNullOrUndefined(dateFrom) && !isNullOrUndefined(dateTo)) {
    const fromDate = stringToDate(dateFrom);
    const toDate = stringToDate(dateTo);

    if (toDate < fromDate) {
      result = true;
    }
  }

  return result;
}

export function toExportDateFormat(list: any[]): any {
  let clonedList: any = [];
  if (list.length > 0) {
    clonedList = JSON.parse(JSON.stringify(list));
    const keys = Object.keys(clonedList[0]);
    keys.forEach((key) => {
      if (
        key.toUpperCase().indexOf('Date'.toUpperCase()) > -1 &&
        key.toUpperCase().indexOf('Time'.toUpperCase()) > -1
      ) {
        clonedList.forEach((cloned) => {
          if (cloned[key] !== '') {
            const dateTime = stringToDateTime(cloned[key]);
            dateTime.setSeconds(dateTime.getSeconds() - 4);
            cloned[key] = dateTime;
          }
        });
      } else if (key.toUpperCase().indexOf('Date'.toUpperCase()) > -1) {
        clonedList.forEach((cloned) => {
          if (cloned[key] !== '') {
            const date = stringToDate(cloned[key]);
            date.setSeconds(date.getSeconds() - 4);
            cloned[key] = date;
          }
        });
      }
    });
  }
  return clonedList;
}

export function dateTimetoStringLong(date: Date, format: string): string {
  const dateTimePipeFormat = getInputDateTimeFormat();
  const datePipe = new DatePipe('en-US');
  const dateString = datePipe.transform(date, format);
  return dateString;
}

export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getLogDateTime(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getMilliseconds()}`;
}
export function getMinDate(): string {
  // SQL min date
  return '01/01/1753';
}
export function getMaxDate(): string {
  // SQL min date
  return '31/12/9999';
}
export function setDate(date: Date, day: number): Date {
  date.setDate(date.getDate() + day);
  return date;
}
export function setDateString(date: string, day: number): string {
  const newDate = stringToDate(date);
  return datetoString(setDate(newDate, day));
}
export function getTimeStringToDate(time: string): Date {
  const dateNow: Date = new Date();
  let result: Date = dateNow;
  if (!isNullOrUndefined(time)) {
    const arr = time.split(':');
    result = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDay(),
      Number(arr[0]),
      Number(arr[1])
    );
    return result;
  } else {
    return null;
  }
}
