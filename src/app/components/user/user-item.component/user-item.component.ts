import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserItemModel } from 'app/models';
import { BaseItemInterface } from 'app/core/interfaces/base-item/base-item.interface';
import { BaseItemComponent } from 'app/core/components/base-item/base-item.component';
import {
  FileUpload,
  FormValidationModel,
  PageInformationModel,
  ResponseModel,
  SelectItems,
} from 'app/shared/models/system_model';
import { UserService } from '../user.service';
import {
  isNullOrUndefined,
  isUndefinedOrZeroLength,
  isUpdateMode,
} from 'app/shared/functions/value.function';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { modelRegister } from 'app/shared/functions/model.function';
import { UserItemCustomComponent } from './user-item-custom.component';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent
  extends BaseItemComponent<UserItemModel>
  implements BaseItemInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  fileUpload: FileUpload = { fileInfos: [] };

  sysLanguageOptions: SelectItems[] = [];
  employeeOptions: SelectItems[] = [];
  roleOptions: SelectItems[] = [];
  subscribetableOptions: SelectItems[] = [];
  constructor(
    private service: UserService,
    private currentActivatedRoute: ActivatedRoute,
    public custom: UserItemCustomComponent
  ) {
    super();
    this.custom.baseService = this.baseService;
    this.id = this.currentActivatedRoute.snapshot.params.id;
  }
  setActionOptions(model?: any): void {
    // super.setActionOptions();
  }
  setInfoOptions(model?: any): void {
    // super.setInfoOptions();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.checkAccessMode();
    this.checkPageMode();
  }
  checkPageMode(): void {
    if (isUpdateMode(this.id)) {
      this.isUpdateMode = true;
      this.setInitialUpdatingData();
    } else {
      this.isUpdateMode = false;
      this.setInitialCreatingData();
    }
    this.onEnumLoader();
    this.getGroups();
  }
  checkAccessMode(): void {
    super.checkAccessMode(
      this.accessService.getNestedComponentAccessRight(false)
    );
  }
  onEnumLoader(): void {
    this.baseDropdown.getSysLanguageEnumDropDown(this.sysLanguageOptions);
  }
  getById(): Observable<UserItemModel> {
    return this.service.getUserTableById(this.id);
  }
  getInitialData(): Observable<UserItemModel> {
    return this.custom.getInitialData();
  }
  setInitialCreatingData(): void {
    this.getInitialData().subscribe((result) => {
      this.model = result;
      this.onAsyncRunner(result);
      super.setDefaultValueSystemFields();
    });
  }
  setInitialUpdatingData(): void {
    this.getById().subscribe(
      (result) => {
        this.model = result;
        this.setUpdateUser(result);
        this.onAsyncRunner(result);
        this.setInfoOptions(result);
        this.setActionOptions(result);
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  onAsyncRunner(model?: any): void {
    forkJoin(
      this.baseDropdown.getEmployeeDropDown(),
      this.baseDropdown.getRoleDropDown(),
      this.baseDropdown.getSubscribeDropDown()
    ).subscribe(
      ([employee, role, subscribetable]) => {
        this.employeeOptions = employee;
        this.roleOptions = role;
        this.subscribetableOptions = subscribetable;
        if (!isNullOrUndefined(model)) {
          this.model = model;
          modelRegister(this.model);
        }
        this.setFieldAccessing();
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  setFieldAccessing(): void {
    this.custom
      .getPageAccessRight(
        super.getCanCreate(),
        super.getCanUpdate(),
        this.model
      )
      .subscribe((res) => {
        this.isView = res;
      });
    this.custom.getFieldAccessing(this.model).subscribe((res) => {
      super.setBaseFieldAccessing(res);
    });
  }
  onSave(validation: FormValidationModel): void {
    this.getDataValidation().subscribe((res) => {
      console.log('res', res, validation.isValid);
      if (res && validation.isValid) {
        console.log('validation', validation.isValid);
        this.onSubmit(true);
      }
    });
  }
  onSaveAndClose(validation: FormValidationModel): void {
    this.getDataValidation().subscribe((res) => {
      if (res && validation.isValid) {
        this.onSubmit(true);
      }
    });
  }
  onSubmit(isColsing: boolean): void {
    this.setFileUpload();
    if (this.isUpdateMode) {
      super.onUpdate(this.updateUserSettings(this.model), isColsing);
    } else {
      super.onCreate(this.service.createUserTable(this.model), isColsing);
    }
  }
  updateUserSettings(model: UserItemModel): Observable<ResponseModel> {
    return this.userDataService.updateUserData(model).pipe(
      tap((user) => {
        this.userDataService.setAppLanguage(user.languageid);

        this.translate.use(user.languageid);
        this.userDataService.languageChangeSubject.next(true);
      })
    );
  }
  getDataValidation(): Observable<boolean> {
    return this.custom.getDataValidation();
  }
  setFileUpload(): void {
    if (
      isUndefinedOrZeroLength(this.fileUpload.fileInfos) ||
      isUndefinedOrZeroLength(this.fileUpload.fileInfos[0])
    ) {
      return;
    } else {
      const file = this.fileUpload.fileInfos[0].base64.split(',');
    }
  }
}
