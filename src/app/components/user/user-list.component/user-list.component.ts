import { Component, Input } from '@angular/core';
import { UserListModel } from 'app/models';
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
import { UserListCustomComponent } from './user-list-custom.component';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { ColumnType, SortType } from 'app/shared/constants';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent
  extends BaseListComponent<UserListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  constructor(
    private service: UserService,
    public custom: UserListCustomComponent
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
    this.option.key = 'user_uuid';
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.EMPLOYEE_UUID',
        textKey: 'employee_value',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.USER_NAME',
        textKey: 'user_name',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.USER_PASSWORD',
        textKey: 'user_password',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.ROLE',
        textKey: 'role_value',
        type: ColumnType.STRING,
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
  getList(search: SearchParameter): Observable<SearchResult<UserListModel>> {
    this.$baseGetList = this.service.getUserTableList(search);
    return this.$baseGetList;
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteUserTable(row.uuid));
  }
}
