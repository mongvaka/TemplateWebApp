import { AccessItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
  SelectItems,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
const firstGroup = ['ROLE_TABLE_UUID'];
const secondGroup = ['ROLE_TABLE_UUID', 'SUBSCRIBE_TRANS_TABLE_UUID'];
export class AccessItemCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: AccessItemModel): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    if (isNullOrUndefOrEmptyGUID(model.access_uuid)) {
      fieldAccessing.push({ filedIds: firstGroup, readonly: true });
    } else {
      fieldAccessing.push({ filedIds: secondGroup, readonly: true });
    }
    return of(fieldAccessing);
  }
  getDataValidation(): Observable<boolean> {
    return of(true);
  }
  getPageAccessRight(
    canCreate: boolean,
    canUpdate: boolean,
    model: AccessItemModel
  ): Observable<boolean> {
    const accessright = isNullOrUndefOrEmptyGUID(model.access_uuid)
      ? canCreate
      : canUpdate;
    const accessLogic = true;
    return of(!(accessLogic && accessright));
  }
  getInitialData(): Observable<AccessItemModel> {
    const model = new AccessItemModel();
    model.role_table_uuid = this.baseService.uiService.getKey('role');
    model.can_action = true;
    model.can_create = true;
    model.can_edit = true;
    model.can_read = true;
    model.can_delete = true;
    return of(model);
  }
}
