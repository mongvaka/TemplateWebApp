"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditUrl = exports.isCreateUrl = exports.moveUrlParamToObjParameter = exports.removeQueryParamsByPath = exports.removeAllQueryParams = exports.replaceEnd = exports.deCodePassingObj = exports.enCodePassingObj = exports.removeLatestPath = exports.removeIdPathMatch = exports.isMatchUuid = exports.setFieldConcat = exports.popsIfExist = exports.popIfExist = exports.pushIfNotExist = exports.setPathToParam = exports.isRedirectPath = exports.removeRelatedPath = exports.removeIdPath = exports.cloneObject = exports.getQueryParamObject = exports.getParentNodeByTag = exports.getParentNodeByClass = exports.getParentNode = exports.trimStart = exports.switchAttribute = exports.switchClass = exports.isUuid = exports.getAllUUID = exports.isSiteValid = exports.isPathWithinUrl = exports.base64ToHex = exports.hexToBase64 = exports.decryptObject = exports.encryptObject = exports.uuidValidation = exports.isUpdateMode = exports.isZero = exports.Uuid = exports.getErrorToTranslate = exports.getErrorToTopic = exports.getTranslateMessage = exports.getTranslateMessages = exports.replaceFormat = exports.replaceAll = exports.isUndefinedOrZeroLength = exports.isNullOrUndefOrEmptyGUID = exports.isNullOrUndefOrEmpty = exports.isNullOrUndefined = exports.isNullOrNaN = void 0;
exports.trimEnd = exports.base64ToByteArray = exports.transformLabel = exports.getSiteFormParam = exports.pathToBranchType = exports.guidValidation = exports.removeUrlId = void 0;
var core_1 = require("@ngx-translate/core");
var constant_1 = require("../constants/constant");
var app_injector_1 = require("../../app-injector");
var renderer_service_1 = require("../services/renderer.service");
var crypto_js_1 = __importDefault(require("crypto-js"));
function isNullOrNaN(object) {
    if (object === null ||
        object === undefined ||
        object === NaN ||
        object === 'NaN') {
        return true;
    }
    else {
        return false;
    }
}
exports.isNullOrNaN = isNullOrNaN;
function isNullOrUndefined(object) {
    if (object === null || object === undefined) {
        return true;
    }
    else {
        return false;
    }
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNullOrUndefOrEmpty(object) {
    if (object === null || object === undefined || object === '') {
        return true;
    }
    else {
        return false;
    }
}
exports.isNullOrUndefOrEmpty = isNullOrUndefOrEmpty;
function isNullOrUndefOrEmptyGUID(object) {
    if (object === null ||
        object === undefined ||
        object === '' ||
        object === constant_1.EmptyUuid) {
        return true;
    }
    else {
        return false;
    }
}
exports.isNullOrUndefOrEmptyGUID = isNullOrUndefOrEmptyGUID;
function isUndefinedOrZeroLength(object) {
    if (object === null || object === undefined || object === '') {
        return true;
    }
    else if (object.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isUndefinedOrZeroLength = isUndefinedOrZeroLength;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
exports.replaceAll = replaceAll;
function replaceFormat(str, strs) {
    if (isUndefinedOrZeroLength(strs) || strs.length === undefined) {
        return str;
    }
    else {
        strs.forEach(function (item, index) {
            str = str.replace(new RegExp('\\{{' + index + '\\}}', 'gi'), item);
        });
        return str;
    }
}
exports.replaceFormat = replaceFormat;
function getTranslateMessages(trans) {
    var messages = [];
    if (!isUndefinedOrZeroLength(trans)) {
        trans.forEach(function (tran) {
            messages.push(getTranslateMessage(tran));
        });
    }
    return messages;
}
exports.getTranslateMessages = getTranslateMessages;
function getTranslateMessage(tran) {
    if (isUndefinedOrZeroLength(tran) || isNullOrUndefined(tran.code)) {
        return '';
    }
    var translate = app_injector_1.AppInjector.get(core_1.TranslateService);
    var split = tran.code.split('.');
    var code = tran.code;
    if (split.length > 2) {
        code = split[0] + '.' + split[1];
    }
    var codeNumber = '';
    if (code.match('.') && !/\s/g.test(code)) {
        if (split[1] !== 'ERROR' &&
            split[1] !== 'SUCCESS' &&
            split[1] !== 'WARNING' &&
            split[1] !== 'INFORMATION') {
            codeNumber = split[1] + ': ';
        }
    }
    var row = '';
    if (!isNullOrUndefined(tran.row)) {
        row = "{Row " + tran.row + "} ";
    }
    if (!isNullOrUndefined(tran.parameters)) {
        for (var i = 0; i < tran.parameters.length; i++) {
            tran.parameters[i] = translate.instant(tran.parameters[i]);
        }
    }
    return replaceFormat(codeNumber + row + translate.instant(code), tran.parameters);
}
exports.getTranslateMessage = getTranslateMessage;
function getErrorToTopic(response) {
    if (!isUndefinedOrZeroLength(response) &&
        !isUndefinedOrZeroLength(response.error)) {
        return { code: response.error.error.message };
    }
    else {
        return {
            code: 'ERROR.00507',
            parameters: [response.status.toString(), response.statusText],
        };
    }
}
exports.getErrorToTopic = getErrorToTopic;
function getErrorToTranslate(response) {
    var translates = [];
    var translate = app_injector_1.AppInjector.get(core_1.TranslateService);
    function mapParams(error, key) {
        return error.errorParameter[key].map(function (param) {
            var multiLabel = param.split(',');
            if (multiLabel.length > 1) {
                var labels_1 = '';
                multiLabel.forEach(function (label) {
                    labels_1 = isNullOrUndefOrEmpty(labels_1)
                        ? "" + translate.instant(label)
                        : labels_1 + "," + translate.instant(label);
                });
                return labels_1;
            }
            else if (param.toString().match('LABEL.') ||
                param.toString().match('ENUM.')) {
                return translate.instant(param);
            }
            else {
                return param;
            }
        });
    }
    if (!isNullOrUndefined(response)) {
        var error_1 = response.error.error;
        if (!isNullOrUndefined(error_1)) {
            if (!isNullOrUndefined(error_1.errorMessage)) {
                var messagekeys = Object.keys(error_1.errorMessage);
                if (!isUndefinedOrZeroLength(messagekeys)) {
                    if (error_1.code === '500') {
                        var msg = '';
                        for (var i = 0; i < messagekeys.length; i++) {
                            var key = messagekeys[i];
                            msg += key + ": " + error_1.errorMessage[key] + "\n";
                        }
                        translates.push({ code: '{{0}}', parameters: [msg] });
                    }
                    else {
                        messagekeys.forEach(function (key) {
                            var errorParameter = isUndefinedOrZeroLength(error_1.errorParameter[key])
                                ? null
                                : mapParams(error_1, key);
                            var rowParameter = isNullOrUndefined(error_1.rowParameter)
                                ? null
                                : error_1.rowParameter[key];
                            if (error_1.errorMessage[key].includes('ERROR.DUPLICATE')) {
                                var mergeParameter = errorParameter
                                    .toString()
                                    .split(',')
                                    .join(', ');
                                errorParameter = [mergeParameter];
                            }
                            translates.push({
                                code: error_1.errorMessage[key],
                                parameters: errorParameter,
                                row: rowParameter,
                            });
                        });
                    }
                }
            }
        }
    }
    return translates;
}
exports.getErrorToTranslate = getErrorToTranslate;
// export function getWarningToTranslate(response: NotificationResponse): TranslateModel[] {
//   const translates: TranslateModel[] = [];
//   const translate = AppInjector.get(TranslateService);
//   function mapParams(noti, key): any {
//     return noti.notificationParameter[key].map((param) => {
//       if (param.toString().match('LABEL.') || param.toString().match('ENUM.') || param.toString().match('SUCCESS.')) {
//         return translate.instant(param);
//       } else {
//         return param;
//       }
//     });
//   }
//   if (!isNullOrUndefined(response.notificationMessage)) {
//     const messagekeys = Object.keys(response.notificationMessage);
//     if (!isUndefinedOrZeroLength(messagekeys)) {
//       messagekeys.forEach((key, i) => {
//         const errorParameter = isUndefinedOrZeroLength(response.notificationParameter[key]) ? null : mapParams(response, key);
//         translates.push({
//           code: response.notificationMessage[key],
//           parameters: errorParameter,
//           type: response.notificationType[i]
//         });
//       });
//     }
//   }
//   return translates;
// }
// export function removeUrlId(url: string): string {
//   const arr = url.replace('/', '').split('/');
//   let result = '';
//   arr.forEach((f, i) => {
//     if (i !== arr.length - 1) {
//       result = result.concat('/', f);
//     }
//   });
//   return result;
// }
var Uuid = /** @class */ (function () {
    function Uuid() {
    }
    Uuid.newUuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    return Uuid;
}());
exports.Uuid = Uuid;
function isZero(value) {
    if (value === 0 || value === null) {
        return true;
    }
    else {
        return false;
    }
}
exports.isZero = isZero;
// export function isLessThanZero(value: number): boolean {
//   if (value < 0 || value === null) {
//     return true;
//   } else {
//     return false;
//   }
// }
// export function isLessThanOrEqualToZero(value: number): boolean {
//   if (value <= 0 || value === null) {
//     return true;
//   } else {
//     return false;
//   }
// }
function isUpdateMode(id) {
    return id !== constant_1.EmptyUuid;
}
exports.isUpdateMode = isUpdateMode;
// export function getDocumentStatusGUID(statusId: string, option: SelectItems[]): any {
//   const item = option.find((o) => o.rowData.statusId === statusId);
//   if (item !== undefined) {
//     return item.value;
//   }
//   return null;
// }
// export function getDocumentStatusID(statusGuid: string, option: SelectItems[]): string {
//   const item = option.find((o) => o.value === statusGuid);
//   if (item !== undefined) {
//     return item.rowData.statusId;
//   }
//   return null;
// }
// export function getRefTypeFromRoute(pathRefType: string): number {
//   switch (pathRefType) {
//     case ROUTE_REF_TYPE.COMPANY:
//       return RefType.Company;
//     case ROUTE_REF_TYPE.PROSPECT:
//       return RefType.Prospect;
//     case ROUTE_REF_TYPE.CUSTOMER:
//       return RefType.Customer;
//     case ROUTE_REF_TYPE.GUARANTOR:
//       return RefType.Guarantor;
//     case ROUTE_REF_TYPE.VENDOR:
//       return RefType.Vendor;
//     case ROUTE_REF_TYPE.APPLICATION:
//       return RefType.Application;
//     // case ROUTE_REF_TYPE.CREDIT_APPLICATION:
//     //   return RefType.CreditAppTable;
//     case ROUTE_REF_TYPE.AGREEMENT:
//       return RefType.Agreement;
//     case ROUTE_REF_TYPE.INVOICE:
//       return RefType.Invoice;
//     case ROUTE_REF_TYPE.PAYMENT:
//       return RefType.Payment;
//     case ROUTE_REF_TYPE.PURCHASE_AGREEMENT_CONFIRM:
//       return RefType.PurchaseAgreementConfirm;
//     case ROUTE_REF_TYPE.AGREEMENT_CLASSIFICATION_JOURNAL:
//       return RefType.AgreementClassificationJournal;
//     case ROUTE_REF_TYPE.RECEIPT_TEMP:
//       return RefType.ReceiptTemp;
//     case ROUTE_REF_TYPE.WAIVE:
//       return RefType.Waive;
//     case ROUTE_REF_TYPE.APPLICATION_ASSET:
//       return RefType.ApplicationAsset;
//     case ROUTE_REF_TYPE.AGREEMENT_ASSET:
//       return RefType.AgreementAsset;
//     case ROUTE_REF_TYPE.AGREEMENT_ASSET_FEES:
//       return RefType.AgreementAssetFees;
//     case ROUTE_REF_TYPE.COLLATERAL:
//       return RefType.Collateral;
//     case ROUTE_REF_TYPE.PRODUCT:
//       return RefType.Product;
//     case ROUTE_REF_TYPE.ADDRESS:
//       return RefType.Address;
//     case ROUTE_REF_TYPE.CUST_BANK:
//       return RefType.CustBank;
//     case ROUTE_REF_TYPE.CONTACT:
//       return RefType.Contact;
//     case ROUTE_REF_TYPE.AUTHORIZED_PERSON_TRANS:
//       return RefType.AuthorizedPersonTrans;
//     case ROUTE_REF_TYPE.GUARANTOR_TRANS:
//       return RefType.GuarantorTrans;
//     case ROUTE_REF_TYPE.WITNESS_TRANS:
//       return RefType.WitnessTrans;
//     case ROUTE_REF_TYPE.CUST_TRANS:
//       return RefType.CustTrans;
//     // case ROUTE_REF_TYPE.AGREEMENTLINE:
//     //   return RefType.;
//     // case ROUTE_REF_TYPE.RECEIPT_TABLE:
//     //   return RefType.;
//     // case ROUTE_REF_TYPE.TAX_INVOICE:
//     //   return RefType;
//     case ROUTE_REF_TYPE.AGREEMENT_EARLY_PAYOFF:
//       return RefType.AgreementEarlyPayoff;
//     case ROUTE_REF_TYPE.BRANCH:
//       return RefType.Branch;
//     case ROUTE_REF_TYPE.DOCUMENT_CHECK_LIST:
//       return RefType.DocumentCheckList;
//     case ROUTE_REF_TYPE.COLLECTION_ACTIVITY_TRANS:
//       return RefType.CollectionActivityTrans;
//     case ROUTE_REF_TYPE.DUTY_STAMP_JOURNAL:
//       return RefType.DutyStampJournal;
//     case ROUTE_REF_TYPE.ALL_AGREEMENT_EARLY_PAYOFF:
//       return RefType.AllAgreementEarlyPayOff;
//     case ROUTE_REF_TYPE.PURCH_AGREEMENT_TABLE:
//       return RefType.PurchAgreementTable;
//     case ROUTE_REF_TYPE.VEND_BANK:
//       return RefType.VendBank;
//     default:
//       return null;
//   }
// }
// export function getRefTypeLabelFromRoute(pathRefType: string): string {
//   const refType = getRefTypeFromRoute(pathRefType);
//   return getRefTypeLabelFromRefType(refType);
// }
// export function getRefTypeLabelFromRefType(refType: number): string {
//   switch (refType) {
//     case RefType.Company:
//       return 'LABEL.COMPANY';
//     case RefType.Prospect:
//       return 'LABEL.PROSPECT';
//     case RefType.Customer:
//       return 'LABEL.CUSTOMER';
//     case RefType.Guarantor:
//       return 'LABEL.GUARANTOR';
//     case RefType.Vendor:
//       return 'LABEL.VENDOR';
//     case RefType.Application:
//       return 'LABEL.APPLICATION';
//     case RefType.Agreement:
//       return 'LABEL.AGREEMENT';
//     case RefType.Invoice:
//       return 'LABEL.INVOICE';
//     case RefType.Payment:
//       return 'LABEL.PAYMENT';
//     case RefType.PurchaseAgreementConfirm:
//       return 'LABEL.PURCHASE_AGREEMENT_CONFIRM';
//     case RefType.AgreementClassificationJournal:
//       return 'LABEL.AGREEMENT_CLASSIFICATION_JOURNAL';
//     case RefType.ReceiptTemp:
//       return 'LABEL.RECEIPT_TEMP';
//     case RefType.Waive:
//       return 'LABEL.WAIVE';
//     case RefType.ApplicationAsset:
//       return 'LABEL.APPLICATION_ASSET';
//     case RefType.AgreementAsset:
//       return 'LABEL.AGREEMENT_ASSET';
//     case RefType.AgreementAssetFees:
//       return 'LABEL.AGREEMENT_ASSET_FEES';
//     case RefType.Collateral:
//       return 'LABEL.COLLATERAL';
//     case RefType.Product:
//       return 'LABEL.PRODUCT';
//     case RefType.Address:
//       return 'LABEL.ADDRESS';
//     case RefType.CustBank:
//       return 'LABEL.CUST_BANK';
//     case RefType.Contact:
//       return 'LABEL.CONTACT';
//     case RefType.AuthorizedPersonTrans:
//       return 'LABEL.AUTHORIZED_PERSON_TRANS';
//     case RefType.GuarantorTrans:
//       return 'LABEL.GUARANTOR_TRANS';
//     case RefType.WitnessTrans:
//       return 'LABEL.WITNESS_TRANS';
//     case RefType.CustTrans:
//       return 'LABEL.CUST_TRANS';
//     case RefType.CollateralMovementJournal:
//       return 'LABEL.COLLATERAL_MOVEMENT_JOURNAL';
//     case RefType.ProvisionJournal:
//       return 'LABEL.PROVISION_JOURNAL';
//     case RefType.AgreementTransIncomeRealization:
//       return 'LABEL.AGREEMENT_TRANS_INCOME_REALIZATION';
//     case RefType.AgreementEarlyPayoff:
//       return 'LABEL.AGREEMENT_EARLY_PAYOFF';
//     case RefType.Branch:
//       return 'LABEL.BRANCH';
//     case RefType.DocumentCheckList:
//       return 'LABEL.DOCUMENT_CHECK_LIST';
//     case RefType.CollectionActivityTrans:
//       return 'LABEL.COLLECTION_ACTIVITY_TRANS';
//     case RefType.DutyStampJournal:
//       return 'LABEL.DUTY_STAMP_JOURNAL';
//     case RefType.AllAgreementEarlyPayOff:
//       return 'LABEL.ALL_AGREEMENT_EARLY_PAY_OFF';
//     case RefType.PurchAgreementTable:
//       return 'LABEL.PURCH_AGREEMENT_TABLE';
//     case RefType.VendBank:
//       return 'LABEL.VEND_BANK';
//     case RefType.Buyer:
//       return 'LABEL.BUYER';
//     case RefType.CreditAppRequestTable:
//       return 'LABEL.CREDIT_APP_REQUEST_TABLE';
//     case RefType.CreditAppTable:
//       return 'LABEL.CREDIT_APP_TABLE';
//     case RefType.CreditAppRequestLine:
//       return 'LABEL.CREDIT_APP_REQUEST_LINE';
//     case RefType.CreditAppLine:
//       return 'LABEL.CREDIT_APP_LINE';
//     case RefType.AssignmentAgreement:
//       return 'LABEL.ASSIGNMENT_AGREEMENT';
//     case RefType.Cheque:
//       return 'LABEL.CHEQUE';
//     case RefType.PurchaseTable:
//       return 'LABEL.PURCHASE_TABLE';
//     case RefType.PurchaseLine:
//       return 'LABEL.PURCHASE_LINE';
//     case RefType.MainAgreement:
//       return 'LABEL.MAIN_AGREEMENT';
//     case RefType.GuarantorAgreement:
//       return 'LABEL.GUARANTOR_AGREEMENT';
//     case RefType.BusinessCollateralAgreement:
//       return 'LABEL.BUSINESS_COLLATERAL_AGREEMENT';
//     case RefType.BuyerAgreement:
//       return 'LABEL.BUYER_AGREEMENT';
//     case RefType.PaymentDetail:
//       return 'LABEL.PAYMENT_DETAIL';
//     case RefType.CollectionFollowUp:
//       return 'LABEL.COLLECTION_FOLLOW_UP';
//     case RefType.RelatedPerson:
//       return 'LABEL.RELATED_PERSON';
//     case RefType.InvoiceSettlementDetail:
//       return 'LABEL.INVOICE_SETTLEMENT_DETAIL';
//     case RefType.WithdrawalTable:
//       return 'LABEL.WITHDRAWAL_TABLE';
//     case RefType.WithdrawalLine:
//       return 'LABEL.WITHDRAWAL_LINE';
//     case RefType.CustomerRefund:
//       return 'LABEL.CUSTOMER_REFUND';
//     case RefType.Blacklist:
//       return 'LABEL.BLACKLIST';
//     case RefType.Verification:
//       return 'LABEL.VERIFICATION';
//     case RefType.Employee:
//       return 'LABEL.EMPLOYEE';
//     case RefType.ServiceFeeTrans:
//       return 'LABEL.SERVICE_FEE_TRANS';
//     case RefType.MessengerJob:
//       return 'LABEL.MESSENGER_JOB';
//     default:
//       return '';
//   }
// }
function uuidValidation(uuid) {
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) {
        return true;
    }
    else if (uuid === constant_1.EmptyUuid) {
        return true;
    }
    else {
        return false;
    }
}
exports.uuidValidation = uuidValidation;
// export function compareObject(obj1, obj2, ignore?: Array<string>): boolean {
//   const str1 = isNullOrUndefined(ignore) ? JSON.stringify(obj1) : JSON.stringify(omitKeys(obj1, ignore));
//   const str2 = isNullOrUndefined(ignore) ? JSON.stringify(obj2) : JSON.stringify(omitKeys(obj2, ignore));
//   return str1 === str2;
// }
// function omitKeys(obj, keys): any {
//   const dup = {};
//   for (const key in obj) {
//     if (keys.indexOf(key) === -1) {
//       dup[key] = obj[key];
//     }
//   }
//   return dup;
// }
// export function enumToList(enumType): string[] {
//   const keys = Object.keys(enumType);
//   return keys.slice(keys.length / 2);
// }
// export function enumValueIgnore(enumType, value: number[]): number[] {
//   const enumList = enumToList(enumType);
//   const newValue: number[] = [];
//   enumList.forEach((name, idx) => {
//     const canAdd = value.find((o) => o === idx);
//     if (!canAdd) {
//       newValue.push(idx);
//     }
//   });
//   return newValue;
// }
// export function siteToNum(site: string): number {
//   switch (site) {
//     case AppConst.FRONT:
//       return 0;
//     case AppConst.BACK:
//       return 1;
//     case AppConst.CASHIER:
//       return 2;
//   }
// }
// export function pathToBranchType(site: string): string {
//   switch (site) {
//     case AppConst.CASHIER:
//       return 'BySpecificBranch';
//     case AppConst.FRONT:
//       return 'ByAllBranch';
//     case AppConst.BACK:
//       return 'ByCompany';
//   }
// }
// export function isCreateUrl(url: string): boolean {
//   const arr = url.split('/');
//   if (arr[arr.length - 1] === EmptyGuid) {
//     return true;
//   } else {
//     return false;
//   }
// }
// export function isEditUrl(url: string): boolean {
//   const arr = url.split('/');
//   if (arr[arr.length - 1] === EmptyGuid) {
//     return false;
//   } else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(arr[arr.length - 1])) {
//     return true;
//   } else {
//     return false;
//   }
// }
// export function hasJsonStructure(str): boolean {
//   if (typeof str !== 'string') {
//     return false;
//   }
//   try {
//     const result = JSON.parse(str);
//     const type = Object.prototype.toString.call(result);
//     return type === '[object Object]' || type === '[object Array]';
//   } catch (err) {
//     return false;
//   }
// }
function encryptObject(key, value, saltIV) {
    var salt, iv;
    if (!isUndefinedOrZeroLength(saltIV)) {
        var decryptedSaltIV = decryptObject(key, saltIV);
        var hexValue = base64ToHex(decryptedSaltIV);
        salt = crypto_js_1.default.enc.Hex.parse(hexValue.substr(0, 64));
        iv = crypto_js_1.default.enc.Hex.parse(hexValue.substr(64, 32));
    }
    var saltArr, ivArr;
    if (isUndefinedOrZeroLength(salt)) {
        saltArr = crypto_js_1.default.lib.WordArray.random(constant_1.CRYPTOGRAPHY.SALT_SIZE / 8);
    }
    else {
        saltArr = salt;
    }
    if (isUndefinedOrZeroLength(iv)) {
        ivArr = crypto_js_1.default.lib.WordArray.random(constant_1.CRYPTOGRAPHY.IV_SIZE / 8);
    }
    else {
        ivArr = iv;
    }
    var cipher = crypto_js_1.default.PBKDF2(key, saltArr, {
        keySize: constant_1.CRYPTOGRAPHY.KEY_SIZE / 32,
        iterations: constant_1.CRYPTOGRAPHY.ITERATIONS,
    });
    var encrypted = crypto_js_1.default.AES.encrypt(value, cipher, {
        iv: ivArr,
        padding: crypto_js_1.default.pad.Pkcs7,
        mode: crypto_js_1.default.mode.CBC,
    });
    var encryptedHex = base64ToHex(encrypted.toString());
    var base64Result = hexToBase64(saltArr + ivArr + encryptedHex);
    return base64Result;
}
exports.encryptObject = encryptObject;
function decryptObject(key, value) {
    var hexValue = base64ToHex(value);
    var salt = crypto_js_1.default.enc.Hex.parse(hexValue.substr(0, 64));
    var iv = crypto_js_1.default.enc.Hex.parse(hexValue.substr(64, 32));
    var encryptedContent = hexToBase64(hexValue.substring(96));
    var cipher = crypto_js_1.default.PBKDF2(key, salt, {
        keySize: constant_1.CRYPTOGRAPHY.KEY_SIZE / 32,
        iterations: constant_1.CRYPTOGRAPHY.ITERATIONS,
    });
    var decryptedContent = crypto_js_1.default.AES.decrypt(encryptedContent, cipher, {
        iv: iv,
        padding: crypto_js_1.default.pad.Pkcs7,
        mode: crypto_js_1.default.mode.CBC,
    });
    return decryptedContent.toString(crypto_js_1.default.enc.Utf8);
}
exports.decryptObject = decryptObject;
function hexToBase64(str) {
    if (isUndefinedOrZeroLength(str)) {
        return '';
    }
    return btoa(str
        .match(/\w{2}/g)
        .map(function (a) {
        return String.fromCharCode(parseInt(a, 16));
    })
        .join(''));
}
exports.hexToBase64 = hexToBase64;
function base64ToHex(str) {
    if (isUndefinedOrZeroLength(str)) {
        return '';
    }
    var hex = [];
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')); i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) {
            tmp = '0' + tmp;
        }
        hex[hex.length] = tmp;
    }
    return hex.join('');
}
exports.base64ToHex = base64ToHex;
// export function base64ToByteArray(base64Data: string): any[] {
//   const sliceSize = 1024;
//   const byteCharacters = atob(base64Data);
//   const bytesLength = byteCharacters.length;
//   const slicesCount = Math.ceil(bytesLength / sliceSize);
//   const byteArrays = new Array(slicesCount);
//   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     const begin = sliceIndex * sliceSize;
//     const end = Math.min(begin + sliceSize, bytesLength);
//     const bytes = new Array(end - begin);
//     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   return byteArrays;
// }
// export function b64EncodeUnicode(str): string {
//   return btoa(
//     encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
//       return String.fromCharCode(parseInt(p1, 16));
//     })
//   );
// }
// export function b64DecodeUnicode(str): string {
//   return decodeURIComponent(
//     Array.prototype.map
//       .call(atob(str), (c) => {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join('')
//   );
// }
function isPathWithinUrl(path, router) {
    var result = false;
    if (!router.url.includes('main')) {
        var paths = router.url.split(/[/ :]/);
        for (var i = 0; i < paths.length; i++) {
            if (uuidValidation(paths[i])) {
                paths[i] = ':id';
            }
            if (path.includes('/:id') && i > 0) {
                if (path === paths[i - 1] + "/" + paths[i]) {
                    result = true;
                }
            }
            else if (paths[i] === path) {
                result = true;
            }
        }
    }
    return result;
}
exports.isPathWithinUrl = isPathWithinUrl;
// export function transformLabel(menuItem: any): any {
//   const translate = AppInjector.get(TranslateService);
//   return menuItem.map((item) => {
//     translate.get(item.label).subscribe(
//       (res) => {
//         item.label = res;
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return item;
//   });
// }
function isSiteValid(site) {
    return (site === constant_1.AppConst.FRONT ||
        site === constant_1.AppConst.BACK ||
        site === constant_1.AppConst.CASHIER ||
        site === constant_1.AppConst.OB);
}
exports.isSiteValid = isSiteValid;
//#region Report
function getAllUUID(isSelected, allItems) {
    return isSelected.length <= allItems.length && isSelected.length !== 0
        ? isSelected
        : allItems.map(function (item) {
            return item.value;
        });
}
exports.getAllUUID = getAllUUID;
// export function isSelectAll(isSelected: string[], allItems: number, isEnum: boolean = false): any {
//   const EmptyDyType = isEnum ? EmptyEnum : EmptyGuid;
//   return isSelected.length === allItems || isSelected.length === 0 ? [EmptyDyType] : isSelected.length === 1 ? [isSelected.toString()] : isSelected;
// }
// export function isNullOrUndefinedReturnEmptyArray(object: any): string[] {
//   const result: string[] = [];
//   if (object === null || object === undefined) {
//     return result;
//   } else {
//     return [object];
//   }
// }
// export function compareDefault(dufualt: any, model: any): any {
//   Object.keys(dufualt)
//     .filter((o) => typeof dufualt[o] === 'number')
//     .forEach((p) => {
//       if (isNullOrUndefOrEmpty(model[p])) {
//         model[p] = dufualt[p];
//       }
//     });
//   return model;
// }
function isUuid(stringToTest) {
    var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regexGuid.test(stringToTest);
}
exports.isUuid = isUuid;
// export function setDisabledFunction(functionItems: MenuItem[], fnID: string, active: boolean): any {
//   const func = functionItems.find((o) => o.id === fnID);
//   func.disabled = active;
// }
// //#endregion Report
function switchClass(elNative, className, isSet) {
    if (isSet === void 0) { isSet = true; }
    var service = app_injector_1.AppInjector.get(renderer_service_1.RendererService);
    var renderer = service.renderer;
    if (!isNullOrUndefined(elNative)) {
        if (isSet && !elNative.classList.contains(className)) {
            renderer.addClass(elNative, className);
        }
        else if (!isSet && elNative.classList.contains(className)) {
            renderer.removeClass(elNative, className);
        }
    }
}
exports.switchClass = switchClass;
function switchAttribute(elNative, att, value, isSet) {
    if (value === void 0) { value = ''; }
    if (isSet === void 0) { isSet = true; }
    var service = app_injector_1.AppInjector.get(renderer_service_1.RendererService);
    var renderer = service.renderer;
    if (!isNullOrUndefined(elNative) && !isNullOrUndefined(elNative.attributes)) {
        if (isSet && !elNative.hasAttribute(att)) {
            renderer.setAttribute(elNative, att, value);
        }
        else if (!isSet && elNative.hasAttribute(att)) {
            renderer.removeAttribute(elNative, att);
        }
    }
}
exports.switchAttribute = switchAttribute;
// export function trimEnd(text: string, trim = null): string {
//   if (isNullOrUndefined(text)) {
//     while (text.substr(text.length - 1, 1) === ' ' && text.length > 0) {
//       for (let index = 0; index < text.length; index++) {
//         if (text.substr(text.length - 1, 1) === ' ') {
//           text = text.substr(0, text.length - 1);
//         }
//       }
//     }
//   } else {
//     while (text.substr(text.length - trim.length, trim.length) === trim && text.length > trim.length) {
//       for (let index = 0; index < text.length; index++) {
//         if (text.substr(text.length - trim.length, trim.length) === trim) {
//           text = text.substr(0, text.length - trim.length);
//         }
//       }
//     }
//   }
//   return text;
// }
function trimStart(text, trim) {
    if (trim === void 0) { trim = null; }
    if (!isNullOrUndefOrEmpty(text)) {
        while (text.substr(0, 1) === trim && text.length > trim.length) {
            text = text.substr(1, text.length - 1);
        }
    }
    return text;
}
exports.trimStart = trimStart;
function getParentNode(elNative, layers) {
    var parent = elNative;
    for (var index = 0; index < layers; index++) {
        if (!isNullOrUndefined(parent) && !isNullOrUndefined(parent.parentNode)) {
            parent = parent.parentNode;
        }
    }
    return parent;
}
exports.getParentNode = getParentNode;
function getParentNodeByClass(elNative, className) {
    var parent = elNative;
    var counter = 20;
    while (counter > 0) {
        try {
            parent = parent.parentNode;
            if (parent.classList.contains(className)) {
                counter = 0;
            }
            counter--;
        }
        catch (error) {
            counter--;
        }
    }
    return parent;
}
exports.getParentNodeByClass = getParentNodeByClass;
function getParentNodeByTag(elNative, tag) {
    var parent = elNative;
    var counter = 20;
    while (counter > 0) {
        try {
            parent = parent.parentNode;
            if (parent.tagName.toUpperCase() === tag.toUpperCase()) {
                counter = 0;
            }
            counter--;
        }
        catch (error) {
            counter--;
        }
    }
    return parent;
}
exports.getParentNodeByTag = getParentNodeByTag;
function getQueryParamObject(sourceUrl) {
    if (isUndefinedOrZeroLength(sourceUrl)) {
        return null;
    }
    if (sourceUrl.includes('%')) {
        sourceUrl = decodeURIComponent(sourceUrl);
    }
    var splits = sourceUrl.split('?');
    var idx = splits.findIndex(function (item) { return item.includes('='); });
    if (idx > -1) {
        var result = {};
        var queries = splits[idx].split('&');
        for (var i = 0; i < queries.length; i++) {
            var keyValue = queries[i].split('=');
            result[keyValue[0]] = keyValue[1];
        }
        return result;
    }
    else {
        return null;
    }
}
exports.getQueryParamObject = getQueryParamObject;
// export function getNewRouteFromWorkFlowUrl(url: string, siteLogin: string): string {
//   const splits = url.split('/');
//   const wfIndex = splits.findIndex((item) => item.includes(WORKFLOW.WF));
//   if (wfIndex < 0) {
//     return url;
//   } else {
//     let result = '';
//     if (splits[wfIndex].split(':').length > 2) {
//       const firstSegment = splits[wfIndex].split(':').slice(2);
//       let firstSeg = '';
//       for (let i = 0; i < firstSegment.length; i++) {
//         firstSeg = firstSeg.concat(':', firstSegment[i]);
//         console.log('firstSeg', firstSeg);
//       }
//       firstSeg = firstSeg.replace('::', ':');
//       const segments = splits.slice(wfIndex + 1);
//       for (let i = 0; i < segments.length; i++) {
//         result = result.concat('/', segments[i]);
//       }
//       result = result.replace('//', '/');
//       const retVal = `/${siteLogin}${firstSeg}${result}`;
//       console.log(retVal);
//       return retVal;
//     } else {
//       const segments = splits.slice(wfIndex + 1);
//       for (let i = 0; i < segments.length; i++) {
//         result = result.concat('/', segments[i]);
//       }
//       result = result.replace('//', '/');
//       return `/${siteLogin}${result}`;
//     }
//   }
// }
// export function getQueryStringValue(key: string, sourceUrl: string): string[] {
//   if (isUndefinedOrZeroLength(sourceUrl)) {
//     return null;
//   }
//   if (sourceUrl.includes('%')) {
//     sourceUrl = decodeURIComponent(sourceUrl);
//   }
//   const splits = sourceUrl.split('?');
//   if (splits.length > 1) {
//     const queries = splits[1].split('&');
//     let result: string[] = [];
//     for (let i = 0; i < queries.length; i++) {
//       const keyValue = queries[i].split('=');
//       if (keyValue[0].toLowerCase() === key.toLowerCase()) {
//         result.push(keyValue[1]);
//       }
//     }
//     return result;
//   } else {
//     return null;
//   }
// }
function cloneObject(obj) {
    if (isNullOrUndefined(obj)) {
        return null;
    }
    var result = JSON.parse(JSON.stringify(obj));
    return result;
}
exports.cloneObject = cloneObject;
function removeIdPath(url, newId, redirectPath) {
    var arr = url.split('/');
    var reletedIndex = 0;
    for (var i = arr.length; i > 0; i--) {
        if (isUuid(arr[i])) {
            reletedIndex = i;
            break;
        }
    }
    if (reletedIndex > 0) {
        arr.splice(reletedIndex, arr.length - reletedIndex);
        if (isNullOrUndefined(newId)) {
            if (arr[arr.length - 1].includes('-child')) {
                arr.splice(arr.length - 1, 1);
            }
            if (!isNullOrUndefined(redirectPath)) {
                arr[arr.length - 1] = redirectPath;
            }
        }
        else {
            arr.push(newId);
        }
        return arr.join('/');
    }
    else {
        return url;
    }
}
exports.removeIdPath = removeIdPath;
// export function getIdPath(url: string, newId?: string): string {
//   const arr = trimStart(url, '/').split('/');
//   let lastSegmentIndex = 0;
//   for (let i = arr.length; i > 0; i--) {
//     if (isGuid(arr[i])) {
//       lastSegmentIndex = i;
//       break;
//     }
//   }
//   if (lastSegmentIndex > 0) {
//     return arr[lastSegmentIndex];
//   } else {
//     const arrParam = arr[0].split(':');
//     for (let i = arrParam.length; i > 0; i--) {
//       if (isGuid(arrParam[i])) {
//         lastSegmentIndex = i;
//         break;
//       }
//     }
//     if (lastSegmentIndex > 0) {
//       return arrParam[lastSegmentIndex];
//     } else {
//       return null;
//     }
//   }
// }
function removeRelatedPath(url) {
    var result = url;
    var arr = url.split('/');
    var reletedIndex = 0;
    for (var i = arr.length; i > 0; i--) {
        if (arr[i] === constant_1.RELATED_SPLITTER.INFO) {
            reletedIndex = i;
            break;
        }
    }
    if (reletedIndex > 0) {
        arr.splice(reletedIndex, arr.length);
        result = arr.join('/');
    }
    else {
        var parentPath_1 = [];
        arr.forEach(function (item) {
            if (item.includes(':')) {
                var arrParam = item.split('$');
                if (arrParam.length > 1) {
                    parentPath_1 = parentPath_1.concat(arrParam.slice(0, arrParam.length - 1).join('$'));
                    parentPath_1.push(replaceAll(arrParam[arrParam.length - 1], ':', '/'));
                }
                else {
                    parentPath_1.push(replaceAll(item, ':', '/'));
                }
            }
        });
        if (parentPath_1.length === 0) {
            result = url;
        }
        else if (parentPath_1.length === 1) {
            result = parentPath_1[0];
        }
        else {
            result = parentPath_1.join('/');
        }
    }
    return result;
}
exports.removeRelatedPath = removeRelatedPath;
// export function removeLastPath(url: string, step: number = 1): RemovedUrl {
//   const arr = url.split('/');
//   const rem = [];
//   if (step < arr.length) {
//     rem.push(arr.slice(arr.length - step, step));
//     arr.splice(arr.length - step, step);
//     return { url: arr.join('/'), removed: rem.join('/') };
//   } else {
//     return { url, removed: null };
//   }
// }
function isRedirectPath(url) {
    var arr = url.split('/');
    return arr.length > 1 && !isUuid(arr[arr.length - 1]) ? true : false;
}
exports.isRedirectPath = isRedirectPath;
function setPathToParam(url) {
    var startIndex;
    url = trimStart(url, '/');
    var arr = url.split('/');
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].includes(':') && i < arr.length - 1) {
            if (!arr[i + 1].includes(':')) {
                startIndex = i + 1;
            }
        }
    }
    if (!isNullOrUndefined(startIndex)) {
        var params = arr.slice(startIndex, arr.length);
        arr.splice(startIndex, arr.length - startIndex);
        // const paramJoin = params.join(':');
        return [arr, params.join(':')].join('$');
    }
    else {
        return replaceAll(url, '/', ':');
    }
}
exports.setPathToParam = setPathToParam;
// export function setAppendingRelatedName(url: string, relatedName: string): string {
//   if (isNullOrUndefOrEmpty(relatedName)) {
//     return url;
//   }
//   url = trimStart(url, '/');
//   const arrUrl = url.split('/');
//   const arrParam = arrUrl[0].split(':');
//   if (arrParam.length > 1) {
//     arrParam[0] = `${arrParam[0]}${relatedName}`;
//     arrUrl[0] = arrParam.join(':');
//   } else {
//     arrUrl[0] = `${arrUrl[0]}${relatedName}`;
//   }
//   return arrUrl.join('/');
// }
// export function setRemovingRelatedName(url: string): string {
//   url = trimStart(url, '/');
//   const arrUrl = url.split('/');
//   const arrParam = arrUrl[0].split(':');
//   const arrSite = arrParam[0].split('!');
//   if (arrSite.length > 1) {
//     arrSite.pop();
//     arrParam[0] = arrSite.join('!');
//     arrUrl[0] = arrParam.join(':');
//   }
//   return arrUrl.join('/');
// }
// export function setParamToPath(url: string): string {
//   return replaceAll(url, ':', '/');
// }
// export function isSiteWithParam(site: string): boolean {
//   // site = router.
//   const arr = site.split(':');
//   return arr.length > 1 ? true : false;
// }
function pushIfNotExist(array, item) {
    var index = array.findIndex(function (f) { return f === item; });
    if (index === -1) {
        array.push(item);
    }
    return array;
}
exports.pushIfNotExist = pushIfNotExist;
function popIfExist(array, item) {
    var index = array.findIndex(function (f) { return f === item; });
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}
exports.popIfExist = popIfExist;
function popsIfExist(array, items) {
    items.forEach(function (item) {
        var index = array.findIndex(function (f) { return f === item; });
        if (index > -1) {
            array.splice(index, 1);
        }
    });
    return array;
}
exports.popsIfExist = popsIfExist;
function setFieldConcat(field1, field2) {
    var result = [];
    field1.forEach(function (f) {
        result.push(f);
    });
    field2.forEach(function (f) {
        result.push(f);
    });
    return result;
}
exports.setFieldConcat = setFieldConcat;
// export function getBindingItemCondition(itemGUID: string, options?: SelectItems[]): SearchCondition[] {
//   return [
//     {
//       columnName: AppConst.BINDING_ITEM,
//       value: itemGUID,
//       type: ColumnType.MASTER,
//       operator: isNullOrUndefined(options) ? Operators.OR : Operators.AND
//     }
//   ];
// }
// export function getRelatedItemCondition(itemGUID: string): SearchCondition[] {
//   return [{ columnName: AppConst.PARENT_COLUMN, value: itemGUID, type: ColumnType.MASTER, operator: Operators.AND }];
// }
// export function getRelatedItemConditionMultipleValue(values: string[]): SearchCondition[] {
//   const output: SearchCondition[] = [];
//   values.forEach((item) => {
//     output.push({ columnName: AppConst.CONDITION_VALUE, value: item, type: ColumnType.MASTER, operator: Operators.AND });
//   });
//   return output;
// }
// export function getRelatedItemConditionDateRange(dates: string[]): SearchCondition[] {
//   const output: SearchCondition[] = [];
//   output.push({ columnName: AppConst.CONDITION_VALUE, values: dates, type: ColumnType.DATERANGE, operator: Operators.AND });
//   return output;
// }
function isMatchUuid(stringToTest) {
    var regexGuid = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    return ((stringToTest.match(regexGuid) ? true : false) || stringToTest === constant_1.EmptyUuid);
}
exports.isMatchUuid = isMatchUuid;
function removeIdPathMatch(url) {
    var arr = url.split('/');
    var reletedIndex = 0;
    var matchIndex = -1;
    for (var i = arr.length; i > 0; i--) {
        if (isUuid(arr[i])) {
            reletedIndex = i;
            matchIndex++;
            if (matchIndex > 0) {
                break;
            }
        }
    }
    if (reletedIndex > 0) {
        arr.splice(reletedIndex + matchIndex, arr.length);
        return arr.join('/');
    }
    else {
        return url;
    }
}
exports.removeIdPathMatch = removeIdPathMatch;
function removeLatestPath(url) {
    var arr = url.split('/');
    var idIndex = -1;
    for (var i = arr.length; i > 0; i--) {
        if (isUuid(arr[i])) {
            idIndex = i;
            break;
        }
    }
    if (idIndex > 0) {
        arr.splice(idIndex + 1, arr.length - idIndex + 1);
    }
    return arr.join('/');
}
exports.removeLatestPath = removeLatestPath;
function enCodePassingObj(obj) {
    var result = obj;
    if (!isNullOrUndefined(obj)) {
        result = replaceEnd(btoa("" + obj), '=', '8');
    }
    return result;
}
exports.enCodePassingObj = enCodePassingObj;
function deCodePassingObj(obj) {
    var result = obj;
    if (!isNullOrUndefined(obj)) {
        result = atob(replaceEnd(obj, '8', '='));
    }
    return result;
}
exports.deCodePassingObj = deCodePassingObj;
function replaceEnd(txt, find, replace) {
    var begin = txt.length;
    for (var i = txt.length - 1; i > 0; i--) {
        if (txt[i] === find) {
            begin = i;
        }
        else {
            break;
        }
    }
    if (begin < txt.length) {
        var range = txt.length - begin;
        txt = txt.slice(0, begin);
        for (var i = 0; i < range; i++) {
            txt = "" + txt + replace;
        }
    }
    return txt;
}
exports.replaceEnd = replaceEnd;
// export function getSiteFormParam(siteParam: string): string {
//   if (!isNullOrUndefined(siteParam)) {
//     siteParam = siteParam.split(':')[0];
//     siteParam = siteParam.split('!')[0];
//   }
//   return siteParam;
// }
// export function getProductType(masterRoute: string, requestWording: boolean = false): string {
//   let productTypeValue = 0;
//   let productTypeWord = '';
//   switch (masterRoute) {
//     case 'factoring':
//       productTypeValue = ProductType.Factoring;
//       productTypeWord = 'Factoring';
//       break;
//     case 'bond':
//       productTypeValue = ProductType.Bond;
//       productTypeWord = 'Bond';
//       break;
//     case 'hirepurchase':
//       productTypeValue = ProductType.HirePurchase;
//       productTypeWord = 'HirePurchase';
//       break;
//     case 'lcdlc':
//       productTypeValue = ProductType.LC_DLC;
//       productTypeWord = 'LCDLC';
//       break;
//     case 'leasing':
//       productTypeValue = ProductType.Leasing;
//       productTypeWord = 'Leasing';
//       break;
//     case 'projectfinance':
//       productTypeValue = ProductType.ProjectFinance;
//       productTypeWord = 'ProjectFinance';
//       break;
//     default:
//       break;
//   }
//   return requestWording ? productTypeWord : productTypeValue.toString();
// }
// export function resetModelToDefualt(object: any, types: any[], ignores?: string[]): any {
//   const systemField = [...getPropertyOfModel(new ViewBranchCompanyBaseEntity()), 'effectiveFrom', 'effectiveTo'];
//   ignores = isUndefinedOrZeroLength(ignores) ? [] : ignores;
//   ignores.push(...systemField);
//   // tslint:disable-next-line:forin
//   for (const property in object) {
//     //#region  Map from field type
//     const field = types.find((f) => f.id === property.toUpperCase());
//     const isIgnoresField = ignores.includes(property);
//     if (!isNullOrUndefined(field) && !isIgnoresField) {
//       switch (field.type) {
//         case ColumnType.STRING:
//           object[property] = '';
//           break;
//         case ColumnType.MASTER:
//           object[property] = null;
//           break;
//         case ColumnType.DATE:
//           object[property] = null;
//           break;
//         case ColumnType.INT:
//           object[property] = 0;
//           break;
//         default:
//           break;
//       }
//     }
//     //#endregion
//     //#region  Map from unbound & ignore
//     const isUnbound = property.toUpperCase().includes('_');
//     const isIgnores = ignores.includes(property);
//     if (!isIgnores) {
//       object[property] = isUnbound ? '' : object[property];
//     }
//     //#endregion
//   }
//   return object;
// }
// export function getPropertyOfModel(object: any): string[] {
//   const properties: string[] = [];
//   // tslint:disable-next-line:forin
//   for (const property in object) {
//     properties.push(property);
//   }
//   return properties;
// }
function removeAllQueryParams(url) {
    var urls = url.split('?')[0];
    return urls;
}
exports.removeAllQueryParams = removeAllQueryParams;
function removeQueryParamsByPath(url, parameters) {
    var keysRemove = [];
    if (!isNullOrUndefined(url) && !isNullOrUndefined(parameters)) {
        var keys_1 = Object.keys(parameters);
        var paths = url.split('/');
        var _loop_1 = function (i) {
            if (!paths.some(function (s) { return s === keys_1[i]; })) {
                var sites = paths[1].split(':');
                if (!sites.some(function (s) { return s === keys_1[i]; })) {
                    keysRemove.push(keys_1[i]);
                }
            }
        };
        for (var i = 0; i < keys_1.length; i++) {
            _loop_1(i);
        }
    }
    else {
        return null;
    }
}
exports.removeQueryParamsByPath = removeQueryParamsByPath;
//   keysRemove.forEach((r) => {
//     delete parameters[r];
//   });
//   return parameters;
// }
function moveUrlParamToObjParameter(url, param) {
    var urls = url.split('?');
    var obj;
    if (urls.length > 1) {
        obj = {};
        var urlParam = urls[1];
        var splitedUrlParams = urlParam.split('&');
        splitedUrlParams.forEach(function (p) {
            obj[p.split('=')[0]] = p.split('=')[1];
        });
    }
    if (!isNullOrUndefined(obj) && !isNullOrUndefined(param)) {
        Object.assign(obj, param);
        return obj;
    }
    else if (!isNullOrUndefined(obj)) {
        return obj;
    }
    else {
        return param;
    }
}
exports.moveUrlParamToObjParameter = moveUrlParamToObjParameter;
// export function getDropDownLabel(code: string, value?: string): string {
//   return isNullOrUndefOrEmpty(value) ? code : `[${code}] ${value}`;
// }
// export function round(value: number, decimalPoint: number = 2): number {
//   return Number(Number(value).toFixed(decimalPoint));
// }
// // e.g. roundUp(125.11, 0.1) => 125.2
// export function roundUp(value: number, toMultipleOf: number = 1): number {
//   return Math.ceil(Number(value) / toMultipleOf) * toMultipleOf;
// }
// // e.g. roundDown(125.5, 5) => 125
// export function roundDown(value: number, toMultipleOf: number = 1): number {
//   return Math.floor(Number(value) / toMultipleOf) * toMultipleOf;
// }
// export function checkDataHasValue(object: any, ignores?: string[]): string[] {
//   const systemField = [...getPropertyOfModel(new ViewBranchCompanyBaseEntity()), 'effectiveFrom', 'effectiveTo', 'guidStamp'];
//   ignores = isUndefinedOrZeroLength(ignores) ? [] : ignores;
//   ignores.push(...systemField);
//   const dataHasValue = [];
//   // tslint:disable-next-line:forin
//   for (const property in object) {
//     const isIgnoresField = ignores.includes(property);
//     if (!isNullOrUndefOrEmptyGUID(object[property]) && object[property] !== 0 && !isIgnoresField) {
//       dataHasValue.push(property);
//     }
//   }
//   return dataHasValue;
// }
function isCreateUrl(url) {
    var arr = url.split('/');
    if (arr[arr.length - 1] === constant_1.EmptyUuid) {
        return true;
    }
    else {
        return false;
    }
}
exports.isCreateUrl = isCreateUrl;
function isEditUrl(url) {
    var arr = url.split('/');
    if (arr[arr.length - 1] === constant_1.EmptyUuid) {
        return false;
    }
    else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(arr[arr.length - 1])) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEditUrl = isEditUrl;
function removeUrlId(url) {
    var arr = url.replace('/', '').split('/');
    var result = '';
    arr.forEach(function (f, i) {
        if (i !== arr.length - 1) {
            result = result.concat('/', f);
        }
    });
    return result;
}
exports.removeUrlId = removeUrlId;
function guidValidation(guid) {
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid)) {
        return true;
    }
    else if (guid === constant_1.EmptyUuid) {
        return true;
    }
    else {
        return false;
    }
}
exports.guidValidation = guidValidation;
function pathToBranchType(site) {
    switch (site) {
        case constant_1.AppConst.CASHIER:
            return 'BySpecificBranch';
        case constant_1.AppConst.FRONT:
            return 'ByAllBranch';
        case constant_1.AppConst.BACK:
            return 'ByCompany';
        default:
            return '';
    }
}
exports.pathToBranchType = pathToBranchType;
function getSiteFormParam(siteParam) {
    if (!isNullOrUndefined(siteParam)) {
        siteParam = siteParam.split(':')[0];
        siteParam = siteParam.split('!')[0];
    }
    return siteParam;
}
exports.getSiteFormParam = getSiteFormParam;
function transformLabel(menuItem) {
    var translate = app_injector_1.AppInjector.get(core_1.TranslateService);
    return menuItem.map(function (item) {
        translate.get(item.label).subscribe(function (res) {
            item.label = res;
        }, function (error) {
            console.log(error);
        });
        return item;
    });
}
exports.transformLabel = transformLabel;
function base64ToByteArray(base64Data) {
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return byteArrays;
}
exports.base64ToByteArray = base64ToByteArray;
function trimEnd(text, trim) {
    if (trim === void 0) { trim = null; }
    if (isNullOrUndefined(text)) {
        while (text.substr(text.length - 1, 1) === ' ' && text.length > 0) {
            for (var index = 0; index < text.length; index++) {
                if (text.substr(text.length - 1, 1) === ' ') {
                    text = text.substr(0, text.length - 1);
                }
            }
        }
    }
    else {
        while (text.substr(text.length - trim.length, trim.length) === trim &&
            text.length > trim.length) {
            for (var index = 0; index < text.length; index++) {
                if (text.substr(text.length - trim.length, trim.length) === trim) {
                    text = text.substr(0, text.length - trim.length);
                }
            }
        }
    }
    return text;
}
exports.trimEnd = trimEnd;
