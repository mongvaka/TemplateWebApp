import { Component, Input } from '@angular/core';
import { AccessListModel } from 'app/models';
import { BaseListInterface } from 'app/core/interfaces/base-list/base-list.interface';
import { BaseListComponent } from 'app/core/components/base-list/base-list.component';
import {
  ColumnModel,
  GridFilterModel,
  OptionModel,
  PageInformationModel,
  RowIdentity,
  SearchParameter,
  SearchResult,
} from 'app/shared/models/system_model';
import { AccessListCustomComponent } from './access-list-custom.component';
import { Observable } from 'rxjs';
import { AccessService } from '../access.service';
import { ColumnType, SortType } from 'app/shared/constants';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss'],
})
export class AccessListComponent
  extends BaseListComponent<AccessListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  constructor(
    private service: AccessService,
    public custom: AccessListCustomComponent
  ) {
    super();
  }
  addSingle(): any {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.checkAccessMode();
    this.checkPageMode();
    this.onEnumLoader();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {}
  checkPageMode(): void {}
  onFilter(param: GridFilterModel): void {}
  onEnumLoader(): void {
    this.setDataGridOption();
  }
  checkAccessMode(): void {
    super.checkAccessMode(this.accessService.getAccessRight());
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    this.option.key = 'access_uuid';
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.ACCESS',
        textKey: 'feature_values',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      // {
      //   label: 'LABEL.ROLE_TABLE_UUID',
      //   textKey: 'role_values',
      //   type: ColumnType.STRING,
      //   visibility: true,
      //   sorting: SortType.NONE,
      // },
      {
        label: 'LABEL.CAN_CREATE',
        textKey: 'can_create',
        type: ColumnType.BOOLEAN,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.CAN_EDIT',
        textKey: 'can_edit',
        type: ColumnType.BOOLEAN,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.CAN_READ',
        textKey: 'can_read',
        type: ColumnType.BOOLEAN,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.CAN_DELETE',
        textKey: 'can_delete',
        type: ColumnType.BOOLEAN,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.CAN_DELETE',
        textKey: 'can_delete',
        type: ColumnType.BOOLEAN,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.CAN_ACTION',
        textKey: 'can_action',
        type: ColumnType.BOOLEAN,
        visibility: true,
        sorting: SortType.NONE,
      },
    ];
    this.option.columns = columns;
    super.setGridOptionMapping();
    this.loadList();
  }
  loadList(): void {
    this.getList(this.searchParam).subscribe((result) => {
      this.searchResult = result;
    });
  }
  getList(search: SearchParameter): Observable<SearchResult<AccessListModel>> {
    this.$baseGetList = this.service.getAccessTableList(search);
    return this.$baseGetList;
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteAccessTable(row.uuid));
  }
}
