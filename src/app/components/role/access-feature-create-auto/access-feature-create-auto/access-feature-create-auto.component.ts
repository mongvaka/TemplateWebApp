import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdjustTransferModel } from 'app/models';
import { BaseItemInterface } from 'app/core/interfaces/base-item/base-item.interface';
import { BaseItemComponent } from 'app/core/components/base-item/base-item.component';
import {
  FormValidationModel,
  PageInformationModel,
  SelectItems,
} from 'app/shared/models/system_model';

import {
  isNullOrUndefined,
  isUpdateMode,
} from 'app/shared/functions/value.function';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { modelRegister } from 'app/shared/functions/model.function';
import { AccessFeatureCreateAutoCustomComponent } from './access-feature-create-auto-custom.component';
import { UIControllerService } from 'app/core/services/uiController.service';
import { AccessFeatureCreateAutoService } from '../access-feature-create-auto.service';
import { stringToDate } from 'app/shared/functions/date.function';
@Component({
  selector: 'app-access-feature-create-auto',
  templateUrl: './access-feature-create-auto.component.html',
  styleUrls: ['./access-feature-create-auto.component.scss'],
})
export class AccessFeatureCreateAutoComponent
  extends BaseItemComponent<AdjustTransferModel>
  implements BaseItemInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }

  departmentoldOptions: SelectItems[] = [];
  positionOptions: SelectItems[] = [];
  departmentnewOptions: SelectItems[] = [];
  departmentOptions: SelectItems[] = [];
  employeeOptions: SelectItems[] = [];
  documentStatusOptions: SelectItems[] = [];
  bindingTitleInput1: string;
  bindingTitleInput2: string;
  bindingTitle: string;
  bindingHeight: string;

  constructor(
    private service: AccessFeatureCreateAutoService,
    private currentActivatedRoute: ActivatedRoute,
    public custom: AccessFeatureCreateAutoCustomComponent
  ) {
    super();
    this.custom.baseService = this.baseService;
    this.id = this.currentActivatedRoute.snapshot.params.id;
  }
  @Output() modalclose = new EventEmitter<boolean>();
  @Input('Custclick') modal1: boolean;
  close() {
    this.modal1 = false;
    this.modalclose.emit(this.modal1);
  }

  @Input() set title(pram: any) {
    this.bindingTitle = pram;
  }

  @Input() set titleInput1(pram: string) {
    this.bindingTitleInput1 = pram;
  }
  @Input() set titleInput2(pram: string) {
    this.bindingTitleInput2 = pram;
  }

  @Input() set height(pram: string) {
    this.bindingHeight = pram;
  }
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
  onEnumLoader(): void {}

  getById(): Observable<AdjustTransferModel> {
    return this.service.getAdjustTransferById(this.id);
  }
  getInitialData(): Observable<AdjustTransferModel> {
    return this.custom.getInitialData();
  }
  setInitialCreatingData(): void {
    this.getInitialData().subscribe((result) => {
      this.model = result;
      this.onAsyncRunner(this.model);
      super.setDefaultValueSystemFields();
    });
  }
  setInitialUpdatingData(): void {
    this.getById().subscribe(
      (result) => {
        this.model = result;
        this.setUpdateUser(result);
        this.onAsyncRunner(result);
        super.setDefaultValueSystemFields();
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  onAsyncRunner(model?: any): void {
    forkJoin(
      this.baseDropdown.getEmployeeDropDown(),
      this.baseDropdown.getDepartmentDropDown(),
      this.baseDropdown.getDepartmentDropDown(),
      this.baseDropdown.getDepartmentDropDown(),
      this.baseDropdown.getPositionDropDown(),
      this.baseDropdown.getDocumentStatusDropDown()
    ).subscribe(
      ([
        employee,
        department,
        departmentNew,
        departmentOld,
        position,
        documentStatus,
      ]) => {
        this.employeeOptions = employee;
        this.departmentOptions = department;
        this.departmentnewOptions = departmentNew;
        this.departmentoldOptions = departmentOld;
        this.positionOptions = position;
        this.documentStatusOptions = documentStatus;

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
      if (res && validation.isValid) {
        this.onSubmit(true);
      }
    });
  }
  onClose(): any {
    this.onFunctionBack();
  }
  onSaveAndClose(validation: FormValidationModel): void {
    this.getDataValidation().subscribe((res) => {
      if (res && validation.isValid) {
        this.onPsot(true);
      }
    });
  }
  onSubmit(isColsing: boolean): void {
    if (this.isUpdateMode) {
      super.onExecuteAction(this.service.editAdjustTransfer(this.model));
    } else {
      super.onExecuteAction(this.service.createTransferTrans(this.model));
    }
  }

  onPsot(isColsing: boolean): void {
    if (this.isUpdateMode) {
      super.onExecuteAction(this.service.postAdjustTransfer(this.model));
    } else {
      super.onExecuteAction(this.service.createTransferTrans(this.model));
    }
  }
  getDataValidation(): Observable<boolean> {
    return this.custom.getDataValidation();
  }
}
