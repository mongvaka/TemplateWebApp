import { AccessRightsItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
  SelectItems,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
const firstGroup = [];
const secondGroup = ['ACCESS_RIGHTS_CODE', 'REMARK', 'DESCRIPTION'];
export class AccessRightsItemCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: AccessRightsItemModel): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    if(isNullOrUndefOrEmptyGUID(model.access_rights_uuid)){
      fieldAccessing.push({ filedIds: firstGroup, readonly: true });
    }else{
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
    model: AccessRightsItemModel
  ): Observable<boolean> {
    const accessright = isNullOrUndefOrEmptyGUID(model.access_rights_uuid)
      ? canCreate
      : canUpdate;
    const accessLogic = true;
    return of(!(accessLogic && accessright));
  }
  getInitialData(): Observable<AccessRightsItemModel> {
    const model = new AccessRightsItemModel();
    return of(model);
  }
}
