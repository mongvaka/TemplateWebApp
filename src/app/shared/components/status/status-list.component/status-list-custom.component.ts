import { AccessModeView } from 'app/models';
import { BaseServiceModel } from 'app/shared/models/system_model';
import { Observable, of } from 'rxjs';
import { StatusService } from '../status.service';
export class StatusListCustomComponent {
  baseService: BaseServiceModel<StatusService>;
  parentName = null;
  accessModeView: AccessModeView = new AccessModeView();
  getPageAccessRight(): Observable<any> {
    return new Observable((observer) => {});
  }
  setAccessModeByParentStatus(): Observable<AccessModeView> {
    return of(this.accessModeView);
  }
  getCanCreateByParent(accessRight: boolean): boolean {
    return accessRight && this.accessModeView.canCreate;
  }
  getCanViewByParent(accessRight: boolean): boolean {
    return accessRight && this.accessModeView.canView;
  }
  getCanDeleteByParent(accessRight: boolean): boolean {
    return accessRight && this.accessModeView.canDelete;
  }
}
