import { UserItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
  SelectItems,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
const firstGroup = [];
const secondGroup = ['USER_PASSWORD'];
export class UserItemCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: UserItemModel): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    if(isNullOrUndefOrEmptyGUID(model.user_uuid)){
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
    model: UserItemModel
  ): Observable<boolean> {
    const accessright = isNullOrUndefOrEmptyGUID(model.user_uuid)
      ? canCreate
      : canUpdate;
    const accessLogic = true;
    return of(!(accessLogic && accessright));
  }
  getInitialData(): Observable<UserItemModel> {
    const model = new UserItemModel();
    return of(model);
  }
}
