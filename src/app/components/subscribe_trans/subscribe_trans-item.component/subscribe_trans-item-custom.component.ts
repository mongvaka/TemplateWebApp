import { SubscribeTransItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
  SelectItems,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
const firstGroup = [];
const infoGroup = ['SUBSCRIBE_TABLE_UUID'];
const secondGroup = [];
export class SubscribeTransItemCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: SubscribeTransItemModel, isinfoMode: boolean): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    if (isNullOrUndefOrEmptyGUID(model.subscribe_table_uuid)) {
      if (isinfoMode === true) {
        fieldAccessing.push({ filedIds: infoGroup, readonly: true });
      }
    } else {
      if (isinfoMode === true) {
        fieldAccessing.push({ filedIds: infoGroup, readonly: true });
      }
    }
    return of(fieldAccessing);
  }
  getDataValidation(): Observable<boolean> {
    return of(true);
  }
  getPageAccessRight(
    canCreate: boolean,
    canUpdate: boolean,
    model: SubscribeTransItemModel
  ): Observable<boolean> {
    const accessright = isNullOrUndefOrEmptyGUID(model.subscribe_trans_uuid)
      ? canCreate
      : canUpdate;
    const accessLogic = true;
    return of(!(accessLogic && accessright));
  }
  getInitialData(parentId: string): Observable<SubscribeTransItemModel> {
    const model = new SubscribeTransItemModel();
    model.subscribe_table_uuid = parentId;
    return of(model);
  }
}
