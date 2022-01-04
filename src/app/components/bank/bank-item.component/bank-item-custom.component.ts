import { BankItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
const firstGroup = [];
const secondGroup = [];
export class BankItemCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: BankItemModel): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    if (isNullOrUndefOrEmptyGUID(model.bank_uuid)) {
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
    model: BankItemModel
  ): Observable<boolean> {
    const accessright = isNullOrUndefOrEmptyGUID(model.bank_uuid)
      ? canCreate
      : canUpdate;
    const accessLogic = true;
    return of(!(accessLogic && accessright));
  }
  getInitialData(): Observable<BankItemModel> {
    const model = new BankItemModel();
    return of(model);
  }
}
