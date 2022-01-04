import {
  isNullOrUndefined,
  Uuid,
  isNullOrUndefOrEmpty,
  popsIfExist,
} from './value.function';
import {
  ColumnModel,
  Deletion,
  OptionModel,
  RowIdentity,
} from '../models/system_model';
import { IKey } from '../models/system_model';

let models: any[];
export function modelRegister(model: any): void {
  if (isNullOrUndefined(models)) {
    models = [];
  }
  let uuid = Uuid.newUuid();
  let updatingIndex = -1;
  if (!isNullOrUndefined(model) && !isNullOrUndefined(model.guidStamp)) {
    updatingIndex = models.findIndex((f) => f.guidStamp === model.guidStamp);
    if (updatingIndex > -1) {
      uuid = models[updatingIndex].guidStamp;
      models.splice(updatingIndex, models.length - updatingIndex);
    }
  }
  const freshModel = Object.assign({}, model);
  model.guidStamp = uuid;
  freshModel.guidStamp = uuid;
  models.push(freshModel);
  if (models.length > 20) {
    models.splice(0, 1);
  }
}

export function modelGetDirty(model: any): string[] {
  const keys = Object.keys(model);
  const conflicts = [];
  if (isNullOrUndefined(models)) {
    return [];
  }
  const oldModel = models.filter((m) => m.guidStamp === model.guidStamp)[0];
  if (isNullOrUndefined(oldModel)) {
    return keys;
  } else {
    keys.forEach((key) => {
      if (model[key] !== oldModel[key]) {
        conflicts.push(key);
      }
    });
    const system = [
      'create_by',
      'create_date',
      'update_by',
      'update_date',
      'is_active',
      'branch_uuid',
    ];
    popsIfExist(conflicts, system);
    return conflicts;
  }
}
export function getModelRegistered(guidStamp: string): any {
  return models.find((f) => f.guidStamp === guidStamp);
}

export function setOrderingJson(json: any[], option: OptionModel): any[] {
  let result = [];
  const newKeys = [];
  const colMappers: IKey[] = [];
  if (!isNullOrUndefined(option)) {
    const config: ColumnModel[] = option.columns;
    config.forEach((col) => {
      if (!isNullOrUndefined(col.label)) {
        colMappers.push({
          oldValue: col.textKey,
          newValue: col.label,
        });
        newKeys.push(col.label);
      }
    });
    for (let index = 0; index < json.length; index++) {
      const row = json[index];
      const newRow: any = {};
      newKeys.forEach((key) => {
        const mapper = colMappers.find((f) => f.newValue === key);
        const keyOld = isNullOrUndefined(mapper) ? key : mapper.oldValue;
        const col = config.find((f) => f.textKey === keyOld);
        if (!isNullOrUndefined(col.masterList)) {
          const data = col.masterList.find((f) => f.value === row[keyOld]);
          if (!isNullOrUndefined(data)) {
            newRow[key] = data.label;
          } else {
            newRow[key] = '';
          }
        } else {
          newRow[key] = isNullOrUndefOrEmpty(row[keyOld]) ? '' : row[keyOld];
        }
      });
      result.push(newRow);
    }
  } else {
    result = json;
  }

  return result;
}

export function toRowIdentity(del: Deletion): RowIdentity {
  const row: RowIdentity = { uuid: del.uuid, rowIndex: -1 };
  return row;
}

export function toDeletion(row: RowIdentity): Deletion {
  const del: Deletion = { uuid: row.uuid, searchParams: null };
  return row;
}

export function toMapModel(src: any, des: any) {
  const keys = Object.keys(des);
  keys.forEach((k) => {
    des[k] = src[k];
  });
}
