import { Component, Input } from '@angular/core';
import { AccessRightsListModel } from 'app/models';
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
import { AccessRightsListCustomComponent } from './access_rights-list-custom.component';
import { Observable } from 'rxjs';
import { AccessRightsService } from '../access_rights.service';
import { ColumnType, SortType } from 'app/shared/constants';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-access-rights-list',
  templateUrl: './access_rights-list.component.html',
  styleUrls: ['./access_rights-list.component.scss'],
})
export class AccessRightsListComponent
  extends BaseListComponent<AccessRightsListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  constructor(
    private service: AccessRightsService,
    public custom: AccessRightsListCustomComponent
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
    this.option.key = 'access_rights_uuid';
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.ACCESS_RIGHTS_CODE',
        textKey: 'access_rights_code',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.ACCESS_RIGHTS_NAME',
        textKey: 'access_rights_name',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
      {
        label: 'LABEL.ROLE_UUID',
        textKey: 'role_value',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
    ];
    this.option.columns = columns;
    super.setGridOptionMapping();
    this.loadList(this.searchParam);
  }
  loadList(search: SearchParameter): void {
    this.getList(search).subscribe((result) => {
      this.searchResult = result;
    });
  }
  getList(
    search: SearchParameter
  ): Observable<SearchResult<AccessRightsListModel>> {
    return this.service.getAccessRightsTableList(search);
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteAccessRightsTable(row.uuid));
  }
}
