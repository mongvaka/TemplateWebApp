import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormValidationModel,
  PathParamModel,
} from 'app/shared/models/system_model';
import { Observable } from 'rxjs';

import { BaseInterface } from '../base/baseComponanctInterface';
@Component({
  template: '',
})
// tslint:disable-next-line: component-class-suffix
export declare abstract class BaseItemInterface implements BaseInterface {
  ngOnInit(): void;
  ngOnDestroy(): void;
  ngAfterViewInit(): void;

  checkPageMode(): void;
  checkAccessMode(): void;
  onEnumLoader(): void;
  getById(): Observable<any>;
  setFieldAccessing(): void;
  setInitialUpdatingData(): void;
  onAsyncRunner(model?: any): void;
  setInitialCreatingData(): void;
  setInfoOptions(model?: any): void;
  setActionOptions(model?: any): void;
  //#endregion
  //#region page event
  onSave(validation: FormValidationModel): void;
  onSaveAndClose(validation: FormValidationModel): void;
  onSubmit(isColsing: boolean, model?: any): void;
  getDataValidation(): Observable<boolean>;
  // toReload(param?: PathParamModel): void;
  toInfo(param?: PathParamModel): void;
  toAction(param?: PathParamModel): void;
  //#endregion
}
