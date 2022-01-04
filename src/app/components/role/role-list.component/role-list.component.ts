import { Component, Input } from '@angular/core';
import { RoleListModel } from 'app/models';
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
import { RoleListCustomComponent } from './role-list-custom.component';
import { Observable } from 'rxjs';
import { RoleService } from '../role.service';
import { ColumnType, SortType } from 'app/shared/constants';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent
  extends BaseListComponent<RoleListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  constructor(
    private service: RoleService,
    public custom: RoleListCustomComponent
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
    this.option.key = 'role_uuid';
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.ROLE_NAME',
        textKey: 'role_name',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.REMARK',
        textKey: 'remark',
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
  getList(search: SearchParameter): Observable<SearchResult<RoleListModel>> {
    return this.service.getRoleTableList(search);
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteRoleTable(row.uuid));
  }
}
