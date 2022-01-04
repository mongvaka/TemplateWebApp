import { StatusItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
  SelectItems,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
const firstGroup = [];
const secondGroup = [];
export class StatusItemCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: StatusItemModel): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    if(isNullOrUndefOrEmptyGUID(model.status_uuid)){
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
    model: StatusItemModel
  ): Observable<boolean> {
    const accessright = isNullOrUndefOrEmptyGUID(model.status_uuid)
      ? canCreate
      : canUpdate;
    const accessLogic = true;
    return of(!(accessLogic && accessright));
  }
  getInitialData(): Observable<StatusItemModel> {
    const model = new StatusItemModel();
    return of(model);
  }
}
