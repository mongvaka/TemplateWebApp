import { Component, Input } from '@angular/core';
import { BankListModel } from 'app/models';
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
  SelectItems,
} from 'app/shared/models/system_model';
import { BankListCustomComponent } from './bank-list-custom.component';
import { Observable } from 'rxjs';
import { BankService } from '../bank.service';
import { ColumnType, SortType, Operators } from 'app/shared/constants';
import { ScBank } from 'app/schema/ScBank';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent
  extends BaseListComponent<BankListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  defualtBitOption: SelectItems[] = [];
  demoBankOption: SelectItems[] = [];
  constructor(
    private service: BankService,
    public custom: BankListCustomComponent
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
  onFilter(param: GridFilterModel): void {
    this.baseDropdown.getBankDropDown(this.demoBankOption);
  }
  onEnumLoader(): void {
    this.baseDropdown.getDefaultBitDropDown(this.defualtBitOption);
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
    this.option.key = 'bank_uuid';
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.BANK_CODE',
        textKey: 'bank_code',
        type: ColumnType.STRING,
        tableName: ScBank.tb_name,
        visibility: true,
        sorting: SortType.NONE,
        operator: Operators.EQUAL,
      },
      {
        label: 'LABEL.BANK_NAME',
        textKey: 'bank_name',
        tableName: ScBank.tb_name,
        masterList: this.demoBankOption,
        type: ColumnType.MASTER,
        visibility: true,
        sorting: SortType.NONE,
        operator: Operators.EQUAL,
      },
      {
        label: 'LABEL.BANK_BRANCH',
        textKey: 'bank_branch',
        tableName: ScBank.tb_name,
        fieldName: ScBank.bank_branch,
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.ASC,
        sortingKey: 'bank_branch',
        parentKey: '103',
        operator: Operators.NOT_EQUAL,
      },
    ];
    this.option.columns = columns;
  }
  loadList(): void {
    this.getList(this.searchParam).subscribe((result) => {
      this.searchResult = result;
    });
  }
  getList(search: SearchParameter): Observable<SearchResult<BankListModel>> {
    this.$baseGetList = this.service.getBankTableList(search);
    return this.$baseGetList;
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteBankTable(row.uuid));
  }
  onsearch(e: SearchParameter): void {
    this.searchParam = e;
    this.loadList();
  }
}
