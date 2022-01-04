"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = exports.SearchResult = exports.SearchCondition = exports.SearchParameter = void 0;
var constants_1 = require("app/shared/constants");
var SearchParameter = /** @class */ (function () {
    function SearchParameter() {
        this.conditions = [];
        this.paginator = null;
        this.refTable = null;
        this.branchFilterMode = null;
        this.isAscs = [];
        this.sortColumns = [];
    }
    return SearchParameter;
}());
exports.SearchParameter = SearchParameter;
var SearchCondition = /** @class */ (function () {
    function SearchCondition() {
        this.columnName = null;
        this.tableName = null;
        this.feildName = null;
        this.sortKey = null;
        this.sortType = null;
        this.parameterName = null;
        this.value = null;
        this.values = null;
        this.type = null;
        this.operator = constants_1.Operators.AND;
        this.isParentKey = false;
        this.equalityOperator = constants_1.Operators.EQUAL;
        this.mockValues = null;
        this.bracket = constants_1.BracketType.None;
    }
    return SearchCondition;
}());
exports.SearchCondition = SearchCondition;
var SearchResult = /** @class */ (function () {
    function SearchResult() {
        this.results = [];
        this.paginator = null;
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
var Paginator = /** @class */ (function () {
    function Paginator() {
    }
    return Paginator;
}());
exports.Paginator = Paginator;
