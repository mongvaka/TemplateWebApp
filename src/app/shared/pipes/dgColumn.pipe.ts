import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '../functions/value.function';
import { ColumnModel } from '../models/system_model';

@Pipe({
  name: 'dgColumn',
  pure: false,
})
export class DataGridColumnPipe implements PipeTransform {
  transform(items: ColumnModel[], isNull: boolean): any {
    items.forEach((item) => {
      if (isNullOrUndefined(item.order)) {
        item.order = 999;
      }
    });
    items.sort(this.compare);
    if (!isNullOrUndefined(items)) {
      if (isNull) {
        return items.filter((item) => isNullOrUndefined(item.label));
      } else {
        return items.filter((item) => !isNullOrUndefined(item.label));
      }
    } else {
      return null;
    }
  }
  compare(a: ColumnModel, b: ColumnModel) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}
