import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterItemModel } from 'app/models';
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
import { RegisterService } from '../register.service';
import { RegisterItemCustomComponent } from './register-item-custom.component';
@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss'],
})
export class RegisterItemComponent
  extends BaseItemComponent<RegisterItemModel>
  implements BaseItemInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  currentStep: number = 0;
  registerCategoryOptions: SelectItems[] = [];
  constructor(
    private service: RegisterService,
    private currentActivatedRoute: ActivatedRoute,
    public custom: RegisterItemCustomComponent
  ) {
    super();
    this.addStep(1);
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
  onEnumLoader(): void {}
  getById(): Observable<RegisterItemModel> {
    return this.service.getRegisterTableById(this.id);
  }
  getInitialData(): Observable<RegisterItemModel> {
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
    forkJoin().subscribe(
      ([]) => {
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
      super.onUpdate(this.service.editRegisterTable(this.model), isColsing);
    } else {
      super.onCreate(this.service.createRegisterTable(this.model), isColsing);
    }
  }
  getDataValidation(): Observable<boolean> {
    return this.custom.getDataValidation();
  }
  nextClick(): void {
    document.documentElement.style.setProperty('--step1', 'green');
  }
  addStep(hit: number): void {
    if (hit > 0) {
      if (this.currentStep < 4) {
        this.currentStep = this.currentStep + hit;
      }
    } else {
      if (this.currentStep > 1) {
        this.currentStep = this.currentStep + hit;
      }
    }
    document.documentElement.style.setProperty('--step1', 'gray');
    document.documentElement.style.setProperty('--step2', 'gray');
    document.documentElement.style.setProperty('--step3', 'gray');
    document.documentElement.style.setProperty('--step4', 'gray');
    switch (this.currentStep) {
      case 1:
        document.documentElement.style.setProperty('--step1', '#080808');
        break;
      case 2:
        document.documentElement.style.setProperty('--step2', '#080808');
        break;
      case 3:
        document.documentElement.style.setProperty('--step3', '#080808');
        break;
      case 4:
        document.documentElement.style.setProperty('--step4', '#080808');
        break;
      default:
        break;
    }
  }
}
