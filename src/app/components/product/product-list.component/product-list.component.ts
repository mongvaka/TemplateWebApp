import { Component, Input } from '@angular/core';
import { ProductListModel } from 'app/models';
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
import { ProductListCustomComponent } from './product-list-custom.component';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { ColumnType, SortType, Operators } from 'app/shared/constants';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent
  extends BaseListComponent<ProductListModel>
  implements BaseListInterface
{
  @Input() set pageInfo(param: PageInformationModel) {
    super.setPath(param);
    this.service.setPath(param);
  }
  defualtBitOption: SelectItems[] = [];
  demoProductOption: SelectItems[] = [];
  constructor(
    private service: ProductService,
    public custom: ProductListCustomComponent
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
    // this.baseDropdown.getProductDropDown(this.demoProductOption);
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
    this.option.key = 'product_uuid';
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.BANK_CODE',
        textKey: 'product_code',
        type: ColumnType.STRING,
        tableName: 'ScProduct.tb_name',
        visibility: true,
        sorting: SortType.NONE,
        operator: Operators.EQUAL,
      },
      {
        label: 'LABEL.BANK_NAME',
        textKey: 'product_name',
        tableName: 'ScProduct.tb_name',
        masterList: this.demoProductOption,
        type: ColumnType.MASTER,
        visibility: true,
        sorting: SortType.NONE,
        operator: Operators.EQUAL,
      },
      {
        label: 'LABEL.BANK_BRANCH',
        textKey: 'product_branch',
        tableName: 'ScProduct.tb_name',
        fieldName: 'ScProduct.product_branch',
        type: ColumnType.STRING,
        visibility: true,
        sorting: SortType.ASC,
        sortingKey: 'product_branch',
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
  getList(search: SearchParameter): Observable<SearchResult<ProductListModel>> {
    this.$baseGetList = this.service.getProductTableList(search);
    return this.$baseGetList;
  }
  onCreate(row?: RowIdentity): void {
    super.onCreate(row);
  }
  onView(row: RowIdentity): void {
    super.onView(row);
  }
  onDelete(row: RowIdentity): void {
    super.onDelete(row, this.service.deleteProductTable(row.uuid));
  }
  onsearch(e: SearchParameter): void {
    this.searchParam = e;
    this.loadList();
  }
}
