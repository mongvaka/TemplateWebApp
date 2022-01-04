import { AdjustTransferModel, EducationItemModel } from 'app/models';
import { isNullOrUndefOrEmptyGUID } from 'app/shared/functions/value.function';
import {
  BaseServiceModel,
  FieldAccessing,
  SelectItems,
} from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
import { AdjustPositionModel } from 'app/models';

const firstGroup = [
  'EMPLOYEE_UUID',
  'DEPARTMENT_UUID',
  'TRANSFER_TRANS_DATE',
  'DEPARTMENT_OLD',
  'POSITION_UUID',
  'DOCUMENT_STATUS',
];

export class AccessFeatureCreateAutoCustomComponent {
  baseService: BaseServiceModel<any>;
  getFieldAccessing(model: AdjustTransferModel): Observable<FieldAccessing[]> {
    const fieldAccessing: FieldAccessing[] = [];
    fieldAccessing.push({ filedIds: firstGroup, readonly: true });
    return of(fieldAccessing);
  }
  getDataValidation(): Observable<boolean> {
    return of(true);
  }
  getPageAccessRight(
    canCreate: boolean,
    canUpdate: boolean,
    model: AdjustTransferModel
  ): Observable<boolean> {
    return of(!canCreate);
  }
  getInitialData(): Observable<AdjustTransferModel> {
    const model = new AdjustTransferModel();
    return of(model);
  }
}
