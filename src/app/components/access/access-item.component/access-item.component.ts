import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessItemModel } from 'app/models';
import { BaseItemInterface } from 'app/core/interfaces/base-item/base-item.interface';
import { BaseItemComponent } from 'app/core/components/base-item/base-item.component';
import {
  FormValidationModel,
  PageInformationModel,
  SelectItems,
} from 'app/shared/models/system_model';
import { AccessService } from '../access.service';
import {
  isNullOrUndefined,
  isUpdateMode,
} from 'app/shared/functions/value.function';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { modelRegister } from 'app/shared/functions/model.function';
import { AccessItemCustomComponent } from './access-item-custom.component';
@Component({
  selector: 'app-access-item',
  templateUrl: './access-item.component.html',
  styleUrls: ['./access-item.component.scss'],
})
export class AccessItemComponent
  extends BaseItemComponent<AccessItemModel>
  implements BaseItemInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  subscribetransOptions: SelectItems[] = [];
  roletableOptions: SelectItems[] = [];
  constructor(
    private service: AccessService,
    private currentActivatedRoute: ActivatedRoute,
    public custom: AccessItemCustomComponent
  ) {
    super();
    this.custom.baseService = this.baseService;
    this.custom.baseService.uiService = this.uiService;
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
  onEnumLoader(): void {}
  getById(): Observable<AccessItemModel> {
    return this.service.getAccessTableById(this.id);
  }
  getInitialData(): Observable<AccessItemModel> {
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
      this.baseDropdown.getSubscribeTransDropDown(),
      this.baseDropdown.getRoleDropDown()
    ).subscribe(
      ([subscribetrans, roletable]) => {
        this.subscribetransOptions = subscribetrans;
        this.roletableOptions = roletable;
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
  onSaveAndClose(validation: FormValidationModel): void {
    this.getDataValidation().subscribe((res) => {
      if (res && validation.isValid) {
        this.onSubmit(true);
      }
    });
  }
  onSubmit(isColsing: boolean): void {
    if (this.isUpdateMode) {
      super.onUpdate(this.service.editAccessTable(this.model), isColsing);
    } else {
      super.onCreate(this.service.createAccessTable(this.model), isColsing);
    }
  }
  getDataValidation(): Observable<boolean> {
    return this.custom.getDataValidation();
  }
}
