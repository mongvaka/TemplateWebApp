"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefType = exports.AccountType = void 0;
var AccountType;
(function (AccountType) {
    AccountType[AccountType["Ledger"] = 0] = "Ledger";
    AccountType[AccountType["Bank"] = 1] = "Bank";
    AccountType[AccountType["Vendor"] = 2] = "Vendor";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var RefType;
(function (RefType) {
    RefType[RefType["Employee"] = 33] = "Employee";
    RefType[RefType["LeaveTrans"] = 41] = "LeaveTrans";
})(RefType = exports.RefType || (exports.RefType = {}));
