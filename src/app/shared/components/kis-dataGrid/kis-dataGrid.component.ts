import { KisAlertComponent } from './../cust-alert/cust-alert.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AccessMode,
  ColumnType,
  EmptyUuid,
  Operators,
  SortType,
} from 'app/shared/constants';
import {
  ColumnModel,
  GridFilterModel,
  InputTextConfigModel,
  ISizing,
  OptionModel,
  PaginationModel,
  Paginator,
  RowIdentity,
  SearchParameter,
  SearchResult,
} from 'app/shared/models/system_model';
import { MenuItem } from 'primeng/api/menuitem';
import {
  ButtonConfig,
  CalendarConfig,
  DropdownConfig,
  FormatConfig,
  InputSwitchConfig,
  InputTextConfig,
  MultiSelectConfig,
} from 'app/shared/config/format.config';
import {
  cloneObject,
  getParentNodeByTag,
  isNullOrUndefined,
  isNullOrUndefOrEmpty,
  isUndefinedOrZeroLength,
  switchAttribute,
  switchClass,
} from 'app/shared/functions/value.function';
import { TranslateService } from '@ngx-translate/core';
import { UIControllerService } from 'app/core/services/uiController.service';
import { interval } from 'rxjs/internal/observable/interval';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { getColumnsWidth } from 'app/shared/config/globalvar.config';
import { Table } from 'primeng/table';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cust-data-grid',
  templateUrl: './cust-dataGrid.component.html',
  styleUrls: ['./cust-dataGrid.component.css'],
})
export class KisDataGridComponent implements OnInit, AfterViewInit {
  accessMode = AccessMode;
  bindingDataSource: any[] = [];
  bindingOption: OptionModel;
  initOption: OptionModel;
  bindingColumn: any[];
  paginator: Paginator = { page: 0, first: 0, rows: 10, pageCount: 0 };
  columnType = ColumnType;
  isSearch = false;
  isAction = false;
  key: string;
  searchParam = new SearchParameter();
  menuBarItems: MenuItem[];
  isFirstTime = true;
  totalRecord: number;
  createBtn = true;
  deleteBtn = true;
  canCreate = true;
  canView = true;
  canDelete = true;
  styles = { width: '100%' };
  advanceSearchModel: any;
  _isNewSearch = false;
  isShowLog: boolean;
  oldTitleOffset: number;
  initTitleOffset: number;
  isShowPaginator = true;
  isSearched = false;
  colspan = 1;
  icon: any = 'fas fa-search';

  checked = true;
  actionTh = { width: `${10}em` };
  isMultipleSelection: boolean = false;
  isShowOKCancel: boolean = false;
  multipleSelected = [];
  multipleSelectedStored = [];
  tableHeaderCheckboxIsCheck: boolean = false;

  CURRENCY_13_2 = FormatConfig.CURRENCY_13_2;
  public DEFAULT_INPUTTEXT = new InputTextConfigModel();
  public DEFAULT_DROPDOWN = DropdownConfig.DEFAULT_DROPDOWN;
  public DATERANGE = CalendarConfig.DATERANGE;
  public DATE = CalendarConfig.DATE;
  public INTEGER = FormatConfig.INTEGER;
  public DEFUALT_INPUTSWITCH = InputSwitchConfig.DEFAULT_INPUTSWITCH;
  public DEFAULT_MULTISELECT = MultiSelectConfig.DEFAULT_MULTISELECT;
  public buttonConfig = ButtonConfig.SAVE;
  loading: boolean = false;
  @Output() createEmit = new EventEmitter<RowIdentity>();
  @Output() reloadEmit = new EventEmitter<SearchParameter>();
  @Output() searchEmit = new EventEmitter<SearchParameter>();
  @Output() relatedEmit = new EventEmitter<RowIdentity>();
  @Output() viewEmit = new EventEmitter<RowIdentity>();
  @Output() editEmit = new EventEmitter<RowIdentity>();
  @Output() deleteEmit = new EventEmitter<RowIdentity>();
  @Output() pageEmit = new EventEmitter<PaginationModel>();
  @Output() filterEmit = new EventEmitter<GridFilterModel>();
  @Output() rowAuthEmit = new EventEmitter<any>();
  @Output() multipleEmit = new EventEmitter<any>();
  @Output() cancelEmit = new EventEmitter<any>();
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.scrollHandler(event);
  }

  search() {
    let header = document.getElementsByClassName(
      'p-datatable-header'
    )[0] as HTMLElement;
    if (header.style.display === 'block') {
      this.icon = 'fas fa-search';
      header.style.display = 'none';
    } else {
      this.icon = 'fas fa-times';
      header.style.display = 'block';
    }
  }

  @Input()
  set dataSource(dataSource: any) {
    if (
      !isNullOrUndefined(dataSource) &&
      !isNullOrUndefined(dataSource.results)
    ) {
      this.rowAuthEmit.next(dataSource.results);
      this.setWidthActionColumn();
    }
    this.loading = false;
    if (
      !isNullOrUndefined(dataSource) &&
      //!isNullOrUndefined(dataSource.results) &&
      !isNullOrUndefined(this.bindingOption)
    ) {
      dataSource.results = dataSource.results;
      if (
        isNullOrUndefined(dataSource.paginator) ||
        !this.bindingOption.showPaginator
      ) {
        this.bindingDataSource = this.setDataSource(
          this.bindingOption,
          this.bindingDataSource,
          dataSource.results
        );
        this.bindingDataSource = dataSource.results;
        this.bindingOption.showPaginator = this.setShowPage(false);
      } else {
        this.bindingDataSource = this.setDataSource(
          this.bindingOption,
          this.bindingDataSource,
          dataSource.results
        );
        this.totalRecord = dataSource.paginator.totalRecord;
        this.bindingOption.showPaginator = this.setShowPage(true);
      }
      this.setHeaderChecked();
    }
    this.paginator = dataSource.paginator;
  }
  @Input()
  set option(opt: OptionModel) {
    var column = [];
    opt.columns.forEach((element) => {
      column.push(element.textKey);
    });
    this.bindingColumn = column;
    if (!isNullOrUndefined(opt)) {
      opt.isAdvance = isNullOrUndefined(opt.isAdvance) ? false : opt.isAdvance;
      this.isSearch = opt.isAdvance;
      this.canCreate = opt.canCreate;
      this.canView = opt.canView;
      this.canDelete = opt.canDelete;
      // if (!isNullOrUndefOrEmpty(opt.key)) {
      //   const input = document.createElement('input');
      //   input.setAttribute('type', 'hidden');
      //   input.setAttribute('name', opt.key);
      //   this.elementRef.nativeElement.appendChild(input);
      // }
      if (!isNullOrUndefined(opt.columns)) {
        this.colspan =
          opt.columns.filter((f) => f.visibility && !isNullOrUndefined(f.label))
            .length + 1;
        if (!this.canView && !this.canDelete) {
          this.colspan--;
        }
        const columnsWidth = getColumnsWidth();
        opt.columns.forEach((col) => {
          if (!isNullOrUndefined(col.label)) {
            col.disabledFilter =
              col.type === ColumnType.DATERANGE &&
              !isNullOrUndefined(col.values) &&
              col.values.length > 0
                ? true
                : col.disabledFilter;
            const dataType: ISizing[] = isNullOrUndefined(
              columnsWidth[col.type.toLowerCase()]
            )
              ? []
              : columnsWidth[col.type.toLowerCase()];
            //const dataType: ISizing[] = [];
            let finalWidth = 0;
            if (
              dataType.some((s) =>
                s.columns.some((c) =>
                  col.textKey.toUpperCase().includes(c.toUpperCase())
                )
              )
            ) {
              dataType.forEach((row) => {
                row.columns.forEach((wcol) => {
                  if (wcol.includes('_')) {
                    if (col.textKey.toUpperCase() === wcol.toUpperCase()) {
                      finalWidth = row.width;
                    }
                  } else if (
                    col.textKey.toUpperCase().includes(wcol.toUpperCase())
                  ) {
                    finalWidth = row.width;
                  }
                });
              });
            } else {
              const res = this.translate.instant(col.label);
              const width = res.length * 0.625 + 1.25;
              if (
                width < 12.375 &&
                (col.type === this.columnType.DECIMAL ||
                  col.type === this.columnType.INT)
              ) {
                finalWidth = 12.375;
              } else if (
                width < 14.375 &&
                (col.type === this.columnType.MASTER ||
                  col.type === this.columnType.DATERANGE ||
                  col.type === this.columnType.ENUM)
              ) {
                finalWidth = 14.375;
              } else if (width < 20 && col.type === this.columnType.STRING) {
                finalWidth = 20;
              } else if (width < 20 && col.type === this.columnType.BOOLEAN) {
                finalWidth = 10;
              } else {
                finalWidth = width;
              }
            }
            col.width = { width: `${finalWidth}em` };
          }
        });
      }

      opt.autoSearch = isNullOrUndefined(opt.autoSearch)
        ? true
        : opt.autoSearch;
      const tmpbindingOption: OptionModel = cloneObject(this.bindingOption);
      this.bindingOption = opt;
      this.bindingOption.showPaginator = this.setShowPage(
        isNullOrUndefined(tmpbindingOption)
          ? true
          : tmpbindingOption.showPaginator
      );
      this.onInitAdvanceSearch();
      opt.showPaginator = this.setShowPage(opt.showPaginator);
      this.initOption = cloneObject(opt);
    }

    setTimeout(() => {
      this.generateSearchingArray();
      this.getShowButon();
      this.setSizingPaginator(this.elementRef.nativeElement);
    }, 100);
  }
  @Input()
  set triggerSearch(value: boolean) {
    if (value === true) {
      this.onSearch();
    }
  }
  @Input()
  set createable(_can: boolean) {
    if (!isNullOrUndefined(_can)) {
      this.canCreate = _can;
      this.getMenuBarItem();
    }
  }
  @Input()
  set searchModel(_model: any) {
    this.advanceSearchModel = _model;
  }
  @Input()
  set isNewSearch(value: boolean) {
    this._isNewSearch = value;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setResize();
  }
  @Input()
  set multipleSelection(value: boolean) {
    this.isMultipleSelection = value;
  }
  @Input()
  set showOKCancel(value: boolean) {
    this.isShowOKCancel = value;
  }
  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private uiService: UIControllerService,
    private elementRef: ElementRef
  ) {
    this.isShowLog = true;
    this.DEFAULT_INPUTTEXT.maxlength = 100;
  }
  scrollHandler(event: any): void {
    let table = event.target.querySelector('.p-datatable');
    if (!isNullOrUndefined(table.closest('p-fieldset[listview]'))) {
      table = null;
    }
    if (!isNullOrUndefined(table)) {
      const isUp = false;
      const tr = table.querySelector('tr.header');
      const ths = tr.querySelectorAll('th');
      const topbar: any = document.querySelector('.layout-topbar');
      if (!isNullOrUndefined(ths)) {
        ths.forEach((ele: HTMLInputElement) => {
          ele.style.position = `sticky`;
          ele.style.zIndex = '1';
          ele.style.top = isUp ? `0px` : `${window.scrollY - 153}px`;
        });
      }
    }
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const tables = document.querySelectorAll('p-table');
    for (let i = 0; i < tables.length; i++) {
      if (!tables[i].hasAttribute('id')) {
        const grid = getParentNodeByTag(tables[i], 'cust-data-grid');
        switchAttribute(
          tables[i],
          'id',
          `${grid.attributes['id'].value}${i}`,
          true
        );
      }
    }

    this.setResize();
    this.setPosition();
  }
  setResize(): void {
    setTimeout(() => {
      const fields = document.querySelectorAll('p-fieldset[listview]');
      if (!isNullOrUndefined(fields) || fields.length > 0) {
        fields.forEach((f) => {
          const table = f.querySelectorAll('p-table');
          const card = f.querySelectorAll('div.card');
          if (!isUndefinedOrZeroLength(card)) {
            this.renderer.removeClass(card[0], 'card');
          }
          if (!isNullOrUndefined(table)) {
            const div = f.querySelector('p-table div:first-child');
            this.renderer.removeClass(div, 'primary-grid');
            this.renderer.addClass(div, 'secondary-grid');
          }
        });
      } else {
        this.styles = { width: '100%' };
      }
    }, 100);
  }
  setWidthActionColumn() {
    let th = document.querySelector('#action-th');
    let width = 0;
    if (!isNullOrUndefined(th) && th.clientWidth < 150) {
      width = th.clientWidth;
      const $interval = interval(5).subscribe((val) => {
        th = document.querySelector('#action-th');
        this.actionTh = { width: `${width}px` };
        width += 3;
        if (th.clientWidth >= 150) {
          $interval.unsubscribe();
        }
      });
    } else if (!isNullOrUndefined(th) && th.clientWidth > 150) {
      width = th.clientWidth;
      const $interval = interval(5).subscribe((val) => {
        th = document.querySelector('#action-th');
        this.actionTh = { width: `${width}px` };
        width -= 3;
        if (th.clientWidth <= 150) {
          $interval.unsubscribe();
        }
      });
    }
  }
  setPosition(): void {
    setTimeout(() => {
      const thead: any = document.querySelector('tr.header');
      if (!isNullOrUndefined(thead)) {
        this.initTitleOffset =
          window.scrollY + thead.getBoundingClientRect().top;
      }
    }, 100);
  }
  getMenuBarItem(): void {
    // if (!isNullOrUndefined(this.elementRef.nativeElement.parentNode)) {
    //   const advance = this.elementRef.nativeElement.parentNode.querySelector('.advance-search');
    //   if (!isNullOrUndefined(advance)) {
    //     if (this.isSearch && this.bindingOption.isAdvance) {
    //       this.renderer.addClass(advance, 'filter');
    //     } else {
    //       this.renderer.removeClass(advance, 'filter');
    //     }
    //   }
    // }
  }
  generateSearchingArray(): void {
    this.searchParam.searchCondition = [];
    const panel = document.querySelector('.cust-panel-title');

    if (!isNullOrUndefined(panel)) {
      const textContent = document
        .querySelector('.cust-panel-title')
        .textContent.split(':')[0];
      const stored = this.uiService.getSearchStored(
        `${textContent}:${this.elementRef.nativeElement.id}`
      );
      if (isNullOrUndefined(stored)) {
        this.searchParam.tableKey = `${textContent}:${this.elementRef.nativeElement.id}`;
        this.searchParam.urlPath = this.uiService
          .getHistSnapshot()
          .slice(-1)
          .pop().routeConfig.path;
        this.setAppendingHiddenInput(this.searchParam.tableKey);
      } else {
        this.isSearch = true;
        this.searchParam = JSON.parse(JSON.stringify(stored));
      }

      if (
        isNullOrUndefined(stored) &&
        this.bindingOption.columns !== undefined &&
        !this.bindingOption.isAdvance
      ) {
        this.bindingOption.columns.forEach((col, i) => {
          if (!isNullOrUndefined(col.label)) {
            this.searchParam.searchCondition.push({
              columnName: this.getSeachingKey(col),
              tableName: col.tableName,
              value: null,
              values: isNullOrUndefined(col.values) ? null : col.values,
              mockValues: null,
              subColumnName: col.subTextKey,
              parameterName: i.toString(),
              type: col.type,
              operator: col.operator ? Operators.EQUAL : col.operator,
              equalityOperator: col.equalityOperator,
              isParentKey: false,
            });
          }
        });
        this.bindingOption.columns
          .filter((f) => isNullOrUndefined(f.label))
          .forEach((col, i) => {
            if (isNullOrUndefined(col.label)) {
              this.searchParam.searchCondition.push({
                columnName: this.getSeachingKey(col),
                tableName: col.tableName,
                value: isNullOrUndefined(col.parentKey) ? '' : col.parentKey,
                subColumnName: col.subTextKey,
                parameterName: i.toString(),
                type: col.type,
                operator: col.operator ? Operators.EQUAL : col.operator,
                isParentKey: true,
                equalityOperator: col.equalityOperator,
                bracket: col.bracket,
              });
            }
          });
      } else if (
        isNullOrUndefined(stored) &&
        this.bindingOption.advanceColumns !== undefined &&
        this.bindingOption.isAdvance
      ) {
        this.bindingOption.advanceColumns
          .filter((f) => isNullOrUndefined(f.label))
          .forEach((col, i) => {
            if (isNullOrUndefined(col.label)) {
              this.searchParam.searchCondition.push({
                columnName: this.getSeachingKey(col),
                tableName: col.tableName,
                value: null,
                values: null,
                subColumnName: col.subTextKey,
                parameterName: i.toString(),
                type: col.type,
                operator: col.operator ? Operators.EQUAL : col.operator,
                isParentKey: true,
              });
            }
          });
      }
      if (!this.bindingOption.isAdvance) {
        interval(100)
          .pipe(takeWhile((it) => this.isFirstTime))
          .subscribe((val) => {
            if (!isNullOrUndefined(this.bindingOption.columns)) {
              if (
                this.searchParam.searchCondition.length > 0 &&
                this.searchParam.searchCondition.length ===
                  this.bindingOption.columns.length
              ) {
                if (
                  this.bindingOption.autoSearch &&
                  this.bindingOption.showPaginator
                ) {
                  this.onSearch();
                }
                this.isFirstTime = false;
              }
            }
          });
      }
    }
    this.searchParam.paginator = this.paginator;
  }
  getShowButon(): void {
    if (this.bindingOption !== undefined) {
      this.key = this.bindingOption.key;
      // tslint:disable-next-line:max-line-length
      if (!isNullOrUndefined(this.key)) {
        this.isAction = true;
      }
      if (!isNullOrUndefined(this.bindingOption.authorization)) {
        switch (this.bindingOption.authorization) {
          case AccessMode.viewer:
            this.createBtn = false;
            this.deleteBtn = false;
            break;
          case AccessMode.noAccess:
            this.createBtn = false;
            this.isAction = false;
            break;
          case AccessMode.editor:
            this.createBtn = false;
            this.deleteBtn = false;
            break;
          case AccessMode.creator:
            this.deleteBtn = false;
            break;
          default:
            this.isAction = true;
            this.deleteBtn = true;
            this.createBtn = true;
            break;
        }
        this.getMenuBarItem();
      }
    }
  }
  onCreate(e: any): void {
    if (this.canCreate) {
      const row: RowIdentity = { uuid: EmptyUuid };
      row.isChild = isNullOrUndefined(e.target.closest('p-fieldset[listview]'))
        ? false
        : true;
      this.createEmit.emit(row);
    }
  }
  onReload(): void {
    this.searchParam.searchCondition.forEach((cond) => {
      if (this.bindingOption.columns !== undefined) {
        this.bindingOption.columns.forEach((col, i) => {
          if (cond.columnName === col.textKey) {
            if (!isNullOrUndefined(col.label)) {
              cond.value = '';
            }
          }
        });
      }
    });
    this.searchParam.paginator = {
      page: 0,
      first: 0,
      rows: 10,
      pageCount: null,
    };
    this.setDefaultSort();
    //this.uiService.setSearchStored(this.searchParam);
    this.reloadEmit.emit(this.searchParam);
  }
  onSearch(): void {
    const aPage =
      this.elementRef.nativeElement.querySelectorAll('.p-paginator-pages');
    aPage.forEach((ele: HTMLInputElement) => {
      if (ele.classList.contains('p-highlight')) {
        this.renderer.removeClass(ele, 'p-highlight');
      }
    });
    if (!isNullOrUndefined(aPage[0])) {
      this.renderer.addClass(aPage[0], 'p-highlight');
    }
    this.setDefaultSort();
    this.setPaginateSameRows();
    if (!isNullOrUndefined(this.bindingOption)) {
      if (!this.bindingOption.showPaginator) {
        this.searchParam.paginator.rows = 1000;
        this.searchParam.paginator.page = 0;
      }
    }
    if (this.bindingOption.isAdvance) {
      this.setAdvanceValues();
    }
    this.isSearched = true;
    //this.searchParam.branchFilterMode = BranchFilterType.BYCOMPANY;
    //this.uiService.setSearchStored(this.searchParam);

    this.loading = true;
    this.searchEmit.emit(this.searchParam);
  }
  onRefresh(): void {
    this.setInitialOption();
    this.setDefaultSort();
    this.setPaginateSameRows();
    this.setPaginateDisplayDefault();
    this.searchParam.searchCondition.forEach((search) => {
      if (this.bindingOption.isAdvance) {
        this.setAdvanceValues();
      } else {
        this.bindingOption.columns.forEach((col) => {
          if (!isNullOrUndefined(col.label)) {
            if (this.getSeachingKey(col) === search.columnName) {
              if (
                isNullOrUndefined(col.disabledFilter) ||
                !col.disabledFilter
              ) {
                search.value = '';
                search.values = null;
              }
            }
          } else {
            if (this.getSeachingKey(col) === search.columnName) {
              search.value = col.parentKey;
            }
          }
        });
      }
    });
    this.onFilter();
    //this.searchParam.branchFilterMode = BranchFilterType.BYCOMPANY;
    //this.uiService.setSearchStored(this.searchParam);
    this.loading = true;
    this.reloadEmit.emit(this.searchParam);
  }
  onInitAdvanceSearch(): void {
    if (!isNullOrUndefined(this.elementRef.nativeElement.parentNode)) {
      const advance =
        this.elementRef.nativeElement.parentNode.parentNode.parentNode.querySelector(
          '.advance-search'
        );
      if (!isNullOrUndefined(advance)) {
        if (this.bindingOption.isAdvance) {
          switchClass(advance, 'filter', this.isSearch);
        }
      }
    }
  }
  onFilter(): void {
    this.onInitAdvanceSearch();
    const filter: GridFilterModel = { fact: true };
    if (this.isSearch) {
      this.filterEmit.emit(filter);
    }
  }
  onRelated(id: string): void {
    const row: RowIdentity = { uuid: id };
    this.relatedEmit.emit(row);
  }
  onView(id: string, index: number, e: any): void {
    const row: RowIdentity = { uuid: id, rowIndex: index };
    row.isChild = isNullOrUndefined(e.target.closest('p-fieldset[listview]'))
      ? false
      : true;
    this.uiService.setBlockBody();
    this.viewEmit.emit(row);
  }
  onEdit(id: string, index: number): void {
    const row: RowIdentity = { uuid: id, rowIndex: index };
    this.editEmit.emit(row);
  }
  onDelete(id: string, index: number): void {
    const row: RowIdentity = { uuid: id, rowIndex: index };
    this.setDefaultSort();
    this.deleteEmit.emit(row);
  }

  onSort(header: ColumnModel): void {
    if (
      this.bindingOption.showPaginator &&
      !this.bindingOption.isAdvance &&
      !header.disabledFilter
    ) {
      if (this.bindingOption !== undefined) {
        if (!this.bindingOption.showPaginator) {
          if (header.sorting === SortType.ASC) {
            this.bindingDataSource.sort(
              (a, b) => a[header.textKey] - b[header.textKey]
            );
          } else {
            this.bindingDataSource.sort(
              (a, b) => b[header.textKey] - a[header.textKey]
            );
          }
        } else {
          this.bindingOption.columns.forEach((col) => {
            if (col.textKey !== header.textKey) {
              col.sorting = SortType.NONE;
            }
          });
        }
      }
      switch (header.sorting) {
        case SortType.ASC:
          header.sorting = SortType.DESC;
          break;
        case SortType.DESC:
          header.sorting = SortType.ASC;
          break;
        case SortType.NONE:
          header.sorting = SortType.ASC;
          break;
      }
      //  keyword :=> changing view model
      this.searchParam.sortColumns = [];
      this.searchParam.isAscs = [];
      this.searchParam.sortTable = [];
      this.searchParam.sortColumns.push(
        !isNullOrUndefined(header.sortingKey)
          ? header.sortingKey
          : header.textKey
      );
      this.searchParam.isAscs.push(header.sorting === SortType.ASC);
      if (!isNullOrUndefined(this.bindingOption)) {
        if (!this.bindingOption.showPaginator) {
          this.searchParam.paginator.rows = -1;
          this.searchParam.paginator.page = 0;
        }
      }
      this.searchParam.sortTable.push(header.tableName);
      if (this.bindingOption.isAdvance) {
        this.setAdvanceValues();
      }
      //this.searchParam.branchFilterMode = BranchFilterType.BYCOMPANY;
      this.loading = true;

      this.searchEmit.emit(this.searchParam);
    }
  }
  paginate(e: Paginator): void {
    this.searchParam.paginator = {
      page: e.page,
      first: e.first,
      rows: e.rows,
      pageCount: this.searchParam.paginator.pageCount,
      totalRecord: this.totalRecord,
    };
    this.setDefaultSort();
    if (!isNullOrUndefined(this.bindingOption)) {
      if (!this.bindingOption.showPaginator) {
        this.searchParam.paginator.rows = -1;
        this.searchParam.paginator.page = 0;
      }
    }
    if (this.bindingOption.isAdvance) {
      this.setAdvanceValues();
    }
    //this.searchParam.branchFilterMode = BranchFilterType.BYCOMPANY;
    this.loading = true;
    this.searchEmit.emit(this.searchParam);
  }
  lazyLoad(): void {
    this.searchEmit.emit(this.searchParam);
  }
  setDefaultSort(): void {
    if (this.bindingOption.columns !== undefined) {
      const columns = this.bindingOption.columns;
      if (
        this.searchParam.isAscs.length === 0 ||
        this.searchParam.sortColumns.length === 0 ||
        this.searchParam.sortTable.length === 0
      ) {
        if (columns.some((s) => s.sorting !== SortType.NONE)) {
          const noOrdering = columns.filter(
            (f) =>
              isNullOrUndefined(f.sortingOrder) && f.sorting !== SortType.NONE
          );
          let ordering = columns.filter(
            (f) =>
              !isNullOrUndefined(f.sortingOrder) && f.sorting !== SortType.NONE
          );
          ordering = ordering.sort((a, b) =>
            a.sortingOrder > b.sortingOrder
              ? 1
              : b.sortingOrder > a.sortingOrder
              ? -1
              : 0
          );
          ordering.forEach((col, i) => {
            this.searchParam.sortColumns.push(
              !isNullOrUndefined(col.sortingKey) ? col.sortingKey : col.textKey
            );
            this.searchParam.isAscs.push(col.sorting === SortType.ASC);
            this.searchParam.sortTable.push(col.tableName);
          });
          noOrdering.forEach((col, i) => {
            this.searchParam.sortColumns.push(
              !isNullOrUndefined(col.sortingKey) ? col.sortingKey : col.textKey
            );
            this.searchParam.isAscs.push(col.sorting === SortType.ASC);
            this.searchParam.sortTable.push(col.tableName);
          });
        } else {
          this.searchParam.isAscs.push(true);
          if (!isNullOrUndefined(columns[0])) {
            this.searchParam.sortColumns.push(
              !isNullOrUndefined(columns[0].sortingKey)
                ? columns[0].sortingKey
                : columns[0].textKey
            );
          }
          this.searchParam.sortTable.push(columns[0].tableName);
        }
      }
    }
  }

  setPaginateDefault(): void {
    this.searchParam.paginator = { page: 0, first: 0, rows: 10, pageCount: 0 };
  }
  setPaginateSameRows(): void {
    this.searchParam.paginator = {
      page: 0,
      first: 0,
      rows: this.searchParam.paginator.rows,
      pageCount: 0,
    };
  }
  setPaginateDisplayDefault(): void {
    const firstButton: HTMLElement = document.querySelector(
      '.ui-paginator-first'
    );
    if (!isNullOrUndefined(firstButton)) {
      firstButton.click();
    }
  }
  setAdvanceValues(): void {
    const multiple: ColumnType[] = [
      ColumnType.DATERANGE,
      ColumnType.ENUM,
      ColumnType.MASTER,
      ColumnType.VARIABLES,
    ];
    const atts = Object.keys(this.advanceSearchModel);
    atts.forEach((key) => {
      this.searchParam.searchCondition.forEach((cond) => {
        if (cond.columnName === key) {
          if (multiple.some((s) => s === cond.type)) {
            cond.values = this.advanceSearchModel[key];
          } else {
            cond.value = this.advanceSearchModel[key];
          }
        }
      });
    });
  }
  getSeachingKey(col: ColumnModel): string {
    return isNullOrUndefOrEmpty(col.searchingKey)
      ? col.textKey
      : col.searchingKey;
  }

  setShowPage(factor: boolean): boolean {
    if (isNullOrUndefined(this.bindingOption)) {
      return factor;
    } else if (this.bindingOption.isAdvance) {
      return false;
    } else {
      if (!this.bindingOption.showPaginator) {
        return false;
      } else {
        return factor;
      }
    }
  }

  setDataSource(thisbindingOption: OptionModel, oldData: any, data: any): any {
    if (isNullOrUndefined(this.bindingOption)) {
      return data;
    } else {
      if (!this.bindingOption.showPaginator) {
        if (oldData === []) {
          return data;
        } else {
          return oldData;
        }
      } else {
        return data;
      }
    }
  }
  setInitialOption(): void {
    this.bindingOption.key = this.initOption.key;
    this.bindingOption.showPaginator = this.initOption.showPaginator;
    this.bindingOption.autoSearch = this.initOption.autoSearch;
    this.bindingOption.isAdvance = this.initOption.isAdvance;
    this.bindingOption.canCreate = this.initOption.canCreate;
    this.bindingOption.canDelete = this.initOption.canDelete;
    this.bindingOption.canView = this.initOption.canView;
    this.bindingOption.authorization = this.initOption.authorization;
    this.bindingOption.exportFileName = this.initOption.exportFileName;
    for (let i = 0; i < this.initOption.columns.length; i++) {
      const keys = Object.keys(this.initOption.columns[i]);
      keys.forEach((k) => {
        if (k !== 'masterList') {
          this.bindingOption.columns[i][k] = this.initOption.columns[i][k];
        }
      });
    }
  }
  onScrollx(e: any): void {
    this.setSizingPaginator(e.target);
  }
  setSizingPaginator(ele: any): void {
    const table = ele.querySelector('table');
    const page = ele.querySelector('.p-paginator');
    if (!isNullOrUndefined(table) && !isNullOrUndefined(page)) {
      if (table.offsetWidth > 0) {
        page.style.width = `${table.offsetWidth}px`;
      }
    }
  }
  setAppendingHiddenInput(name: string): void {
    const inputs = document.getElementsByName(name);
    if (inputs.length === 0) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', name);
      this.elementRef.nativeElement.appendChild(input);
    }
  }
  getDateRangeVisibility(values: any): boolean {
    return !isNullOrUndefined(values) && values.length > 0 ? true : false;
  }
  onRowSelect(e: any): void {
    this.multipleSelectedStored.push(e.data);
    this.checkRowCkeckedAll();
  }
  onRowUnselect(e: any): void {
    this.multipleSelectedStored.length = 0;
    this.multipleSelectedStored = Object.assign([], this.multipleSelected);
    this.tableHeaderCheckboxIsCheck = false;
  }
  onMultipleAction(): void {
    this.multipleEmit.emit(this.multipleSelected);
  }
  onCancel(): void {
    this.multipleSelected = [];
    this.cancelEmit.emit();
  }
  setHeaderChecked(): void {
    setTimeout(() => {
      if (
        this.bindingDataSource.length !== 0 &&
        this.multipleSelected.length !== 0
      ) {
        this.checkRowCkeckedAll();
      }
    }, 0);
  }
  checkRowCkeckedAll(): void {
    const selectAll = this.bindingDataSource.every((item) => {
      return isNullOrUndefOrEmpty(
        this.multipleSelected.find(
          (f) => f['creditAppTableGUID'] === item['creditAppTableGUID']
        )
      )
        ? false
        : true;
    });
    this.tableHeaderCheckboxIsCheck = selectAll;
  }
  onTableHeaderCheckboxToggle(e: any, key: string): void {
    if (e.checked) {
      if (this.multipleSelectedStored.length === 0) {
        this.multipleSelectedStored.push(...this.bindingDataSource);
      } else {
        this.bindingDataSource.forEach((item) => {
          const result = this.multipleSelectedStored.find(
            (f) => f['creditAppTableGUID'] === item['creditAppTableGUID']
          );
          if (isNullOrUndefOrEmpty(result)) {
            this.multipleSelectedStored.push(item);
          }
        });
      }
    } else {
      this.bindingDataSource.forEach((item) => {
        const idx = this.multipleSelectedStored.findIndex(
          (f) => f['creditAppTableGUID'] === item['creditAppTableGUID']
        );
        if (!isNullOrUndefOrEmpty(idx)) {
          this.multipleSelectedStored.splice(idx, 1);
        }
      });
    }
    this.multipleSelected = Object.assign([], this.multipleSelectedStored);
  }
  showOption(list: any): any {}
}
