import {
  TranslateModel,
  ErrorResponse,
  ErrorModel,
  SelectItems,
  NotificationResponse,
  RemovedUrl,
  FieldAccessing,
  SearchCondition,
  PathParamModel,
} from '../models/system_model';
import { TranslateService } from '@ngx-translate/core';
import {
  EmptyUuid,
  AppConst,
  EmptyEnum,
  CRYPTOGRAPHY,
  Operators,
  RELATED_SPLITTER,
} from '../constants/constant';
import { Router } from '@angular/router';
import { AppInjector } from '../../app-injector';
import { RendererService } from '../services/renderer.service';
import cryptoJS from 'crypto-js';
import { error } from 'protractor';
export function isNullOrNaN(object: any): boolean {
  if (
    object === null ||
    object === undefined ||
    object === NaN ||
    object === 'NaN'
  ) {
    return true;
  } else {
    return false;
  }
}
export function isNullOrUndefined(object: any): boolean {
  if (object === null || object === undefined) {
    return true;
  } else {
    return false;
  }
}
export function isNullOrUndefOrEmpty(object: any): boolean {
  if (object === null || object === undefined || object === '') {
    return true;
  } else {
    return false;
  }
}
export function isNullOrUndefOrEmptyGUID(object: any): boolean {
  if (
    object === null ||
    object === undefined ||
    object === '' ||
    object === EmptyUuid
  ) {
    return true;
  } else {
    return false;
  }
}
export function isUndefinedOrZeroLength(object: any): boolean {
  if (object === null || object === undefined || object === '') {
    return true;
  } else if (object.length === 0) {
    return true;
  } else {
    return false;
  }
}

export function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(find, 'g'), replace);
}

export function replaceFormat(str: string, strs: string[]): string {
  if (isUndefinedOrZeroLength(strs) || strs.length === undefined) {
    return str;
  } else {
    strs.forEach((item: string, index: number) => {
      str = str.replace(new RegExp('\\{{' + index + '\\}}', 'gi'), item);
    });
    return str;
  }
}
export function getTranslateMessages(trans: TranslateModel[]): string[] {
  const messages: string[] = [];
  if (!isUndefinedOrZeroLength(trans)) {
    trans.forEach((tran) => {
      messages.push(getTranslateMessage(tran));
    });
  }
  return messages;
}

export function getTranslateMessage(tran: TranslateModel): string {
  if (isUndefinedOrZeroLength(tran) || isNullOrUndefined(tran.code)) {
    return '';
  }
  const translate = AppInjector.get(TranslateService);
  const split: string[] = tran.code.split('.');
  let code: string = tran.code;

  if (split.length > 2) {
    code = split[0] + '.' + split[1];
  }
  let codeNumber: string = '';
  if (code.match('.') && !/\s/g.test(code)) {
    if (
      split[1] !== 'ERROR' &&
      split[1] !== 'SUCCESS' &&
      split[1] !== 'WARNING' &&
      split[1] !== 'INFORMATION'
    ) {
      codeNumber = split[1] + ': ';
    }
  }
  let row: string = '';
  if (!isNullOrUndefined(tran.row)) {
    row = `{Row ${tran.row}} `;
  }
  if (!isNullOrUndefined(tran.parameters)) {
    for (let i = 0; i < tran.parameters.length; i++) {
      tran.parameters[i] = translate.instant(tran.parameters[i]);
    }
  }
  return replaceFormat(
    codeNumber + row + translate.instant(code),
    tran.parameters
  );
}
export function getErrorToTopic(response: any): TranslateModel {
  if (
    !isUndefinedOrZeroLength(response) &&
    !isUndefinedOrZeroLength(response.error)
  ) {
    return { code: response.error.error.message };
  } else {
    return {
      code: 'ERROR.00507',
      parameters: [response.status.toString(), response.statusText],
    };
  }
}
export function getErrorToTranslate(response: any): TranslateModel[] {
  const translates: TranslateModel[] = [];
  const translate = AppInjector.get(TranslateService);
  function mapParams(error, key): string[] {
    return error.errorParameter[key].map((param) => {
      const multiLabel = param.split(',');
      if (multiLabel.length > 1) {
        let labels = '';
        multiLabel.forEach((label) => {
          labels = isNullOrUndefOrEmpty(labels)
            ? `${translate.instant(label)}`
            : `${labels},${translate.instant(label)}`;
        });
        return labels;
      } else if (
        param.toString().match('LABEL.') ||
        param.toString().match('ENUM.')
      ) {
        return translate.instant(param);
      } else {
        return param;
      }
    });
  }
  if (!isNullOrUndefined(response)) {
    const error: ErrorModel = response.error.error;
    if (!isNullOrUndefined(error)) {
      if (!isNullOrUndefined(error.errorMessage)) {
        const messagekeys = Object.keys(error.errorMessage);
        if (!isUndefinedOrZeroLength(messagekeys)) {
          if (error.code === '500') {
            let msg: string = '';
            for (let i = 0; i < messagekeys.length; i++) {
              const key = messagekeys[i];
              msg += `${key}: ${error.errorMessage[key]}\n`;
            }
            translates.push({ code: '{{0}}', parameters: [msg] });
          } else {
            messagekeys.forEach((key) => {
              let errorParameter = isUndefinedOrZeroLength(
                error.errorParameter[key]
              )
                ? null
                : mapParams(error, key);
              const rowParameter = isNullOrUndefined(error.rowParameter)
                ? null
                : error.rowParameter[key];
              if (error.errorMessage[key].includes('ERROR.DUPLICATE')) {
                const mergeParameter = errorParameter
                  .toString()
                  .split(',')
                  .join(', ');
                errorParameter = [mergeParameter];
              }
              translates.push({
                code: error.errorMessage[key],
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

export class Uuid {
  static newUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

export function isZero(value: number): boolean {
  if (value === 0 || value === null) {
    return true;
  } else {
    return false;
  }
}

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

export function isUpdateMode(id: string): boolean {
  return id !== EmptyUuid;
}

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
export function uuidValidation(uuid: string): boolean {
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid
    )
  ) {
    return true;
  } else if (uuid === EmptyUuid) {
    return true;
  } else {
    return false;
  }
}

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

export function encryptObject(
  key: string,
  value: string,
  saltIV?: string
): string {
  let salt, iv;
  if (!isUndefinedOrZeroLength(saltIV)) {
    const decryptedSaltIV = decryptObject(key, saltIV);
    const hexValue = base64ToHex(decryptedSaltIV);
    salt = cryptoJS.enc.Hex.parse(hexValue.substr(0, 64));
    iv = cryptoJS.enc.Hex.parse(hexValue.substr(64, 32));
  }

  let saltArr, ivArr;
  if (isUndefinedOrZeroLength(salt)) {
    saltArr = cryptoJS.lib.WordArray.random(CRYPTOGRAPHY.SALT_SIZE / 8);
  } else {
    saltArr = salt;
  }
  if (isUndefinedOrZeroLength(iv)) {
    ivArr = cryptoJS.lib.WordArray.random(CRYPTOGRAPHY.IV_SIZE / 8);
  } else {
    ivArr = iv;
  }

  const cipher = cryptoJS.PBKDF2(key, saltArr, {
    keySize: CRYPTOGRAPHY.KEY_SIZE / 32,
    iterations: CRYPTOGRAPHY.ITERATIONS,
  });
  const encrypted = cryptoJS.AES.encrypt(value, cipher, {
    iv: ivArr,
    padding: cryptoJS.pad.Pkcs7,
    mode: cryptoJS.mode.CBC,
  });

  const encryptedHex = base64ToHex(encrypted.toString());
  const base64Result = hexToBase64(saltArr + ivArr + encryptedHex);

  return base64Result;
}
export function decryptObject(key: string, value: string): string {
  const hexValue = base64ToHex(value);
  const salt = cryptoJS.enc.Hex.parse(hexValue.substr(0, 64));
  const iv = cryptoJS.enc.Hex.parse(hexValue.substr(64, 32));
  const encryptedContent = hexToBase64(hexValue.substring(96));

  const cipher = cryptoJS.PBKDF2(key, salt, {
    keySize: CRYPTOGRAPHY.KEY_SIZE / 32,
    iterations: CRYPTOGRAPHY.ITERATIONS,
  });

  const decryptedContent = cryptoJS.AES.decrypt(encryptedContent, cipher, {
    iv: iv,
    padding: cryptoJS.pad.Pkcs7,
    mode: cryptoJS.mode.CBC,
  });

  return decryptedContent.toString(cryptoJS.enc.Utf8);
}
export function hexToBase64(str: string): string {
  if (isUndefinedOrZeroLength(str)) {
    return '';
  }

  return btoa(
    str
      .match(/\w{2}/g)
      .map((a) => {
        return String.fromCharCode(parseInt(a, 16));
      })
      .join('')
  );
}

export function base64ToHex(str: string): string {
  if (isUndefinedOrZeroLength(str)) {
    return '';
  }
  const hex = [];
  for (
    let i = 0, bin = atob(str.replace(/[ \r\n]+$/, ''));
    i < bin.length;
    ++i
  ) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) {
      tmp = '0' + tmp;
    }
    hex[hex.length] = tmp;
  }
  return hex.join('');
}
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

export function isPathWithinUrl(path: string, router: Router): boolean {
  let result = false;
  if (!router.url.includes('main')) {
    const paths = router.url.split(/[/ :]/);
    for (let i = 0; i < paths.length; i++) {
      if (uuidValidation(paths[i])) {
        paths[i] = ':id';
      }
      if (path.includes('/:id') && i > 0) {
        if (path === `${paths[i - 1]}/${paths[i]}`) {
          result = true;
        }
      } else if (paths[i] === path) {
        result = true;
      }
    }
  }
  return result;
}
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
export function isSiteValid(site: string): boolean {
  return (
    site === AppConst.FRONT ||
    site === AppConst.BACK ||
    site === AppConst.CASHIER ||
    site === AppConst.OB
  );
}
//#region Report
export function getAllUUID(isSelected: string[], allItems: SelectItems[]): any {
  return isSelected.length <= allItems.length && isSelected.length !== 0
    ? isSelected
    : allItems.map((item) => {
        return item.value;
      });
}

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

export function isUuid(stringToTest: string): boolean {
  const regexGuid =
    /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
  return regexGuid.test(stringToTest);
}

// export function setDisabledFunction(functionItems: MenuItem[], fnID: string, active: boolean): any {
//   const func = functionItems.find((o) => o.id === fnID);
//   func.disabled = active;
// }
// //#endregion Report

export function switchClass(
  elNative: any,
  className: string,
  isSet = true
): void {
  const service = AppInjector.get(RendererService);
  const renderer = service.renderer;
  if (!isNullOrUndefined(elNative)) {
    if (isSet && !elNative.classList.contains(className)) {
      renderer.addClass(elNative, className);
    } else if (!isSet && elNative.classList.contains(className)) {
      renderer.removeClass(elNative, className);
    }
  }
}

export function switchAttribute(
  elNative: any,
  att: string,
  value = '',
  isSet = true
): void {
  const service = AppInjector.get(RendererService);
  const renderer = service.renderer;
  if (!isNullOrUndefined(elNative) && !isNullOrUndefined(elNative.attributes)) {
    if (isSet && !elNative.hasAttribute(att)) {
      renderer.setAttribute(elNative, att, value);
    } else if (!isSet && elNative.hasAttribute(att)) {
      renderer.removeAttribute(elNative, att);
    }
  }
}

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

export function trimStart(text: string, trim = null): string {
  if (!isNullOrUndefOrEmpty(text)) {
    while (text.substr(0, 1) === trim && text.length > trim.length) {
      text = text.substr(1, text.length - 1);
    }
  }
  return text;
}
export function getParentNode(elNative: any, layers: number): any {
  let parent = elNative;
  for (let index = 0; index < layers; index++) {
    if (!isNullOrUndefined(parent) && !isNullOrUndefined(parent.parentNode)) {
      parent = parent.parentNode;
    }
  }
  return parent;
}

export function getParentNodeByClass(elNative: any, className: string): any {
  let parent = elNative;
  let counter = 20;
  while (counter > 0) {
    try {
      parent = parent.parentNode;
      if (parent.classList.contains(className)) {
        counter = 0;
      }
      counter--;
    } catch (error) {
      counter--;
    }
  }
  return parent;
}
export function getParentNodeByTag(elNative: any, tag: string): any {
  let parent = elNative;
  let counter = 20;
  while (counter > 0) {
    try {
      parent = parent.parentNode;
      if (parent.tagName.toUpperCase() === tag.toUpperCase()) {
        counter = 0;
      }
      counter--;
    } catch (error) {
      counter--;
    }
  }
  return parent;
}
export function getQueryParamObject(sourceUrl: string): any {
  if (isUndefinedOrZeroLength(sourceUrl)) {
    return null;
  }
  if (sourceUrl.includes('%')) {
    sourceUrl = decodeURIComponent(sourceUrl);
  }

  const splits = sourceUrl.split('?');
  const idx = splits.findIndex((item) => item.includes('='));

  if (idx > -1) {
    const result = {};
    const queries = splits[idx].split('&');
    for (let i = 0; i < queries.length; i++) {
      const keyValue = queries[i].split('=');
      result[keyValue[0]] = keyValue[1];
    }
    return result;
  } else {
    return null;
  }
}

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

export function cloneObject(obj: any): any {
  if (isNullOrUndefined(obj)) {
    return null;
  }
  const result = JSON.parse(JSON.stringify(obj));
  return result;
}

export function removeIdPath(
  url: string,
  newId?: string,
  redirectPath?: string
): string {
  const arr = url.split('/');
  let reletedIndex = 0;
  for (let i = arr.length; i > 0; i--) {
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
    } else {
      arr.push(newId);
    }
    return arr.join('/');
  } else {
    return url;
  }
}
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
export function removeRelatedPath(url: string): string {
  let result = url;
  const arr = url.split('/');
  let reletedIndex = 0;
  for (let i = arr.length; i > 0; i--) {
    if (arr[i] === RELATED_SPLITTER.INFO) {
      reletedIndex = i;
      break;
    }
  }
  if (reletedIndex > 0) {
    arr.splice(reletedIndex, arr.length);
    result = arr.join('/');
  } else {
    let parentPath = [];
    arr.forEach((item) => {
      if (item.includes(':')) {
        const arrParam = item.split('$');
        if (arrParam.length > 1) {
          parentPath = parentPath.concat(
            arrParam.slice(0, arrParam.length - 1).join('$')
          );
          parentPath.push(replaceAll(arrParam[arrParam.length - 1], ':', '/'));
        } else {
          parentPath.push(replaceAll(item, ':', '/'));
        }
      }
    });
    if (parentPath.length === 0) {
      result = url;
    } else if (parentPath.length === 1) {
      result = parentPath[0];
    } else {
      result = parentPath.join('/');
    }
  }
  return result;
}
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
export function isRedirectPath(url: string): boolean {
  const arr = url.split('/');
  return arr.length > 1 && !isUuid(arr[arr.length - 1]) ? true : false;
}
export function setPathToParam(url: string): string {
  let startIndex;
  url = trimStart(url, '/');
  const arr = url.split('/');
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(':') && i < arr.length - 1) {
      if (!arr[i + 1].includes(':')) {
        startIndex = i + 1;
      }
    }
  }
  if (!isNullOrUndefined(startIndex)) {
    const params = arr.slice(startIndex, arr.length);
    arr.splice(startIndex, arr.length - startIndex);
    // const paramJoin = params.join(':');
    return [arr, params.join(':')].join('$');
  } else {
    return replaceAll(url, '/', ':');
  }
}
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
export function pushIfNotExist(array: any[], item: any): any[] {
  const index = array.findIndex((f) => f === item);
  if (index === -1) {
    array.push(item);
  }
  return array;
}
export function popIfExist(array: any[], item: any): any[] {
  const index = array.findIndex((f) => f === item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}
export function popsIfExist(array: any[], items: any[]): any[] {
  items.forEach((item) => {
    const index = array.findIndex((f) => f === item);
    if (index > -1) {
      array.splice(index, 1);
    }
  });
  return array;
}
export function setFieldConcat(
  field1: FieldAccessing[],
  field2: FieldAccessing[]
): FieldAccessing[] {
  const result: FieldAccessing[] = [];
  field1.forEach((f) => {
    result.push(f);
  });
  field2.forEach((f) => {
    result.push(f);
  });
  return result;
}

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
export function isMatchUuid(stringToTest: string): boolean {
  const regexGuid =
    '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
  return (
    (stringToTest.match(regexGuid) ? true : false) || stringToTest === EmptyUuid
  );
}
export function removeIdPathMatch(url: string): string {
  const arr = url.split('/');
  let reletedIndex = 0;
  let matchIndex = -1;
  for (let i = arr.length; i > 0; i--) {
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
  } else {
    return url;
  }
}
export function removeLatestPath(url: string): string {
  const arr = url.split('/');
  let idIndex = -1;
  for (let i = arr.length; i > 0; i--) {
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
export function enCodePassingObj(obj: string): string {
  let result = obj;
  if (!isNullOrUndefined(obj)) {
    result = replaceEnd(btoa(`${obj}`), '=', '8');
  }
  return result;
}
export function deCodePassingObj(obj: string): string {
  let result = obj;
  if (!isNullOrUndefined(obj)) {
    result = atob(replaceEnd(obj, '8', '='));
  }
  return result;
}
export function replaceEnd(txt: string, find: string, replace: string): string {
  let begin = txt.length;
  for (let i = txt.length - 1; i > 0; i--) {
    if (txt[i] === find) {
      begin = i;
    } else {
      break;
    }
  }
  if (begin < txt.length) {
    const range = txt.length - begin;
    txt = txt.slice(0, begin);
    for (let i = 0; i < range; i++) {
      txt = `${txt}${replace}`;
    }
  }
  return txt;
}
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

export function removeAllQueryParams(url: string): string {
  const urls = url.split('?')[0];
  return urls;
}
export function removeQueryParamsByPath(url: string, parameters: any): any {
  const keysRemove = [];
  if (!isNullOrUndefined(url) && !isNullOrUndefined(parameters)) {
    const keys = Object.keys(parameters);
    const paths = url.split('/');
    for (let i = 0; i < keys.length; i++) {
      if (!paths.some((s) => s === keys[i])) {
        const sites = paths[1].split(':');
        if (!sites.some((s) => s === keys[i])) {
          keysRemove.push(keys[i]);
        }
      }
    }
  } else {
    return null;
  }
}
//   keysRemove.forEach((r) => {
//     delete parameters[r];
//   });
//   return parameters;
// }
export function moveUrlParamToObjParameter(url: string, param: any) {
  const urls = url.split('?');
  let obj;
  if (urls.length > 1) {
    obj = {};
    const urlParam = urls[1];
    const splitedUrlParams = urlParam.split('&');
    splitedUrlParams.forEach((p) => {
      obj[p.split('=')[0]] = p.split('=')[1];
    });
  }
  if (!isNullOrUndefined(obj) && !isNullOrUndefined(param)) {
    Object.assign(obj, param);
    return obj;
  } else if (!isNullOrUndefined(obj)) {
    return obj;
  } else {
    return param;
  }
}
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
export function isCreateUrl(url: string): boolean {
  const arr = url.split('/');
  if (arr[arr.length - 1] === EmptyUuid) {
    return true;
  } else {
    return false;
  }
}

export function isEditUrl(url: string): boolean {
  const arr = url.split('/');
  if (arr[arr.length - 1] === EmptyUuid) {
    return false;
  } else if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      arr[arr.length - 1]
    )
  ) {
    return true;
  } else {
    return false;
  }
}
export function removeUrlId(url: string): string {
  const arr = url.replace('/', '').split('/');
  let result = '';
  arr.forEach((f, i) => {
    if (i !== arr.length - 1) {
      result = result.concat('/', f);
    }
  });
  return result;
}
export function guidValidation(guid: string): boolean {
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      guid
    )
  ) {
    return true;
  } else if (guid === EmptyUuid) {
    return true;
  } else {
    return false;
  }
}
export function pathToBranchType(site: string): string {
  switch (site) {
    case AppConst.CASHIER:
      return 'BySpecificBranch';
    case AppConst.FRONT:
      return 'ByAllBranch';
    case AppConst.BACK:
      return 'ByCompany';
    default:
      return '';
  }
}
export function getSiteFormParam(siteParam: string): string {
  if (!isNullOrUndefined(siteParam)) {
    siteParam = siteParam.split(':')[0];
    siteParam = siteParam.split('!')[0];
  }
  return siteParam;
}
export function transformLabel(menuItem: any): any {
  const translate = AppInjector.get(TranslateService);
  return menuItem.map((item) => {
    translate.get(item.label).subscribe(
      (res) => {
        item.label = res;
      },
      (error) => {
        console.log(error);
      }
    );
    return item;
  });
}
export function base64ToByteArray(base64Data: string): any[] {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return byteArrays;
}
export function trimEnd(text: string, trim = null): string {
  if (isNullOrUndefined(text)) {
    while (text.substr(text.length - 1, 1) === ' ' && text.length > 0) {
      for (let index = 0; index < text.length; index++) {
        if (text.substr(text.length - 1, 1) === ' ') {
          text = text.substr(0, text.length - 1);
        }
      }
    }
  } else {
    while (
      text.substr(text.length - trim.length, trim.length) === trim &&
      text.length > trim.length
    ) {
      for (let index = 0; index < text.length; index++) {
        if (text.substr(text.length - trim.length, trim.length) === trim) {
          text = text.substr(0, text.length - trim.length);
        }
      }
    }
  }
  return text;
}
