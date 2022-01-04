import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  GridFilterModel,
  RowIdentity,
  SearchParameter,
  SearchResult,
} from 'app/shared/models/system_model';
import { Observable } from 'rxjs';

import { BaseInterface } from '../base/baseComponanctInterface';
@Component({
  template: '',
})
// tslint:disable-next-line:component-class-suffix
export declare abstract class BaseListInterface implements BaseInterface {
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  checkPageMode(): void;
  checkAccessMode(): void;
  onEnumLoader(): void;
  onFilter(param: GridFilterModel): void;
  setDataGridOption(): void;
  // getList(search: SearchParameter): Observable<SearchResult<any>>;
  onCreate(row: RowIdentity): void;
  onView(row: RowIdentity): void;
  onDelete(row: RowIdentity): void;
}
