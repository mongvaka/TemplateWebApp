import { Component, Input } from '@angular/core';
import { StatusListModel } from 'app/models';
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
import { StatusListCustomComponent } from './status-list-custom.component';
import { Observable } from 'rxjs';
import { StatusService } from '../status.service';
import { ColumnType, SortType } from 'app/shared/constants';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss'],
})
export class StatusListComponent
  extends BaseListComponent<StatusListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  constructor(
    private service: StatusService,
    public custom: StatusListCustomComponent
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
    this.option.key = 'status_uuid';
    const columns: ColumnModel[] = [
      {
        label: "LABEL.STATUS_CODE",
        textKey: "status_code",
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.NONE,
      },
	    ];
    this.option.columns = columns;
    super.setGridOptionMapping();
  }
getList(
    search: SearchParameter
  ): Observable<SearchResult<StatusListModel>> {
    return this.service.getStatusTableList(search);
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteStatusTable(row.uuid));
  }
}
