import { SortType } from './../../constants/enum_system';
import { BracketType, ColumnType, Operators } from 'app/shared/constants';

export class SearchParameter {
  public tableKey?: string;
  public urlPath?: string;
  public searchCondition?: SearchCondition[] = [];
  public paginator?: Paginator = null;
  public refTable?: string = null;
  public branchFilterMode?: string = null;
  public companyBaseGUID?: string;
  public branchBaseGUID?: string;
  public isAscs?: boolean[] = [];
  public sortColumns?: string[] = [];
  public sortTable?: string[] = [];
}
export class SearchCondition {
  public columnName: string = null;
  public tableName?: string = null;
  public feildName?: string = null;
  public sortKey?: string = null;
  public sortType?: SortType = null;
  public subColumnName?: string;
  public parameterName?: string = null;
  public value?: string = null;
  public values?: string[] = null;
  public type: ColumnType = null;
  public operator?: string = Operators.AND;
  public isParentKey?: boolean = false;
  public equalityOperator?: string = Operators.EQUAL;
  public mockValues?: string[] = null;
  public bracket?: number = BracketType.None;
}

export class SearchResult<T> {
  public results: T[] = [];
  public paginator: Paginator = null;
}
export class Paginator {
  public page: number;
  public first: number;
  public rows: number;
  public pageCount: number;
  public totalRecord?: number;
}
