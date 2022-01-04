import { ShowMenuService } from './../services/show-menu.service';
import { Router } from '@angular/router';
import { AppInjector } from 'app/app-injector';
import { UIControllerService } from 'app/core/services/uiController.service';
import { UserDataService } from 'app/core/services/user-data.service';
import { ACTION_PATH, RELATED_SPLITTER } from '../constants';
import { PathParamModel } from '../models/system_model';
import {
  enCodePassingObj,
  isMatchUuid,
  isNullOrUndefined,
  isRedirectPath,
  isUndefinedOrZeroLength,
  moveUrlParamToObjParameter,
  removeAllQueryParams,
  removeIdPath,
  removeIdPathMatch,
  removeLatestPath,
  removeQueryParamsByPath,
  removeRelatedPath,
  replaceAll,
  setPathToParam,
  switchClass,
} from './value.function';

export function setRoutingGateway(
  param: PathParamModel,
  path: string,
  itemPageMode: string[],
  redirectPath: string,
  removeSN: boolean = false
): void {
  const uiService = AppInjector.get(UIControllerService);
  const router = AppInjector.get(Router);
  const userDataService = AppInjector.get(UserDataService);
  let url = router.url;
  let parameters,
    skip = false;
  // if (isWorkFlowMode()) {
  //   if (isUndefinedOrZeroLength(uiService.initialSerialNumberUrl)) {
  //     uiService.initialSerialNumberUrl = router.url;
  //   }
  //   if (removeSN) {
  //     uiService.initialSerialNumberUrl = null;
  //     url = removeSerialNumberQueryString(url);
  //   }
  // }

  if (!isNullOrUndefined(param.parameters)) {
    let encoded = enCodePassingObj(JSON.stringify(param.parameters));
    const obj = {};
    const splitedPath = param.path.split('/');
    obj[splitedPath[splitedPath.length - 1]] = encoded;
    parameters = obj;
  }
  parameters = moveUrlParamToObjParameter(url, parameters);
  url = removeAllQueryParams(url);
  const isRelated = url.match('info');
  if (param.action === ACTION_PATH.TOITEM) {
    let _path = `${url}/${param.pageId}`;
    if (!isRelated) {
      if (isMatchUuid(url) && isMatchUuid(param.pageId)) {
        _path = `${url}/${param.path}/${param.pageId}`;
      }
    }
    url = _path;
  } else if (param.action === ACTION_PATH.TOLIST) {
    if (isRelated) {
      if (isNullOrUndefined(redirectPath)) {
        url = removeIdPath(url);
      } else {
        url = removeIdPath(url, null, redirectPath);
      }
    } else {
      url = removeIdPathMatch(url);
    }
    if (itemPageMode.some((s) => s === path)) {
      url = removeLatestPath(url);
    }
  } else if (param.action === ACTION_PATH.TOREL) {
    if (isRedirectPath(param.path)) {
      let siteParam = setPathToParam(url);
      url = `${siteParam}/${param.path}`;
    } else {
      url = `${[url]}/${RELATED_SPLITTER.INFO}/${param.path}`;
    }
  } else if (
    param.action === ACTION_PATH.TOITEMFUN ||
    param.action === ACTION_PATH.TOWORKFLOW
  ) {
    uiService.skipedPath = url;

    url =
      param.action === ACTION_PATH.TOITEMFUN
        ? `${url}/${RELATED_SPLITTER.ACTION}/${param.path}`
        : `${url}/${RELATED_SPLITTER.WORKFLOW}/${param.path}`;
    skip = true;
    setBodyActionMode(true);
  } else if (param.action === ACTION_PATH.TOLISTFUN) {
    // const removed = removeLastPath(url);
    // uiService.skipedPath = removed.removed;
    uiService.skipedPath = url;
    url = `${url}/${RELATED_SPLITTER.ACTION}/${param.path}`;
    skip = true;
    setBodyActionMode(true);
  } else if (param.action === ACTION_PATH.GOBACK) {
    if (isNullOrUndefined(uiService.skipedPath)) {
      url = removeRelatedPath(url);
    } else {
      url = uiService.skipedPath;
      uiService.skipedPath = null;
      setBodyActionMode(false);
    }
  } else if (param.action === ACTION_PATH.RELOAD) {
    url = `${removeIdPath(url, param.pageId)}​​​​​​​​​​`;
  } else if (param.action === ACTION_PATH.TOCHILDITEM) {
    url = `${url}/${param.path}/${param.pageId}`;
  } else if (param.action === ACTION_PATH.MENUTOLIST) {
    const siteLogin = userDataService.getSiteLogin();
    url = `${siteLogin}/${param.path}`;
    url = replaceAll(url, '//', '/');
  } else if (param.action === ACTION_PATH.MENUTOFUN) {
    const siteLogin = userDataService.getSiteLogin();
    uiService.skipedPath = url;
    url = `${siteLogin}/${RELATED_SPLITTER.ACTION}/${param.path}`;
    skip = true;
    setBodyActionMode(true);
  }

  // if (isWorkFlowMode()) {
  //   if (!isUrlForWorkflow(url) || removeSN) {
  //     uiService.initialSerialNumberUrl = null;
  //     parameters = removeSerialNumberQueryParam(parameters);
  //   } else {
  //     parameters = addSerialNumberQueryParam(parameters);
  //   }
  // }

  navigate([url], skip, parameters);
}

export function navigate(url: string[], skip: boolean, param: any): void {
  const router = AppInjector.get(Router);
  param = removeQueryParamsByPath(url[0], param);
  url[0] = url[0].replace(/\u200B/g, '');
  if (isNullOrUndefined(param)) {
    router.navigate(url, { skipLocationChange: skip });
  } else {
    router.navigate(url, { skipLocationChange: skip, queryParams: param });
    // router.navigate(url, { queryParams: param, queryParamsHandling: 'merge' });
  }
}

// export function isWorkFlowMode(): boolean {
//   if (/(%3FSN%3D)\w+/.test(window.location.href) || /(\?SN\=)\w+/.test(window.location.href)) {
//     return true;
//   } else if (!isUndefinedOrZeroLength(getQueryStringValue(WORKFLOW.SN, window.location.href))) {
//     return true;
//   } else {
//     return false;
//   }
// }
export function removeSerialNumberQueryString(url: string): string {
  const splits = url.split('?');
  if (splits.length > 1) {
    const qSplits = splits[1].split('&');
    const filterSN = qSplits.filter((f) => f.includes('SN='));
    if (isUndefinedOrZeroLength(filterSN)) {
      return url;
    } else {
      filterSN.forEach((f) => {
        url = replaceAll(url, f, '');
      });
      if (filterSN.length === qSplits.length) {
        url = url.replace('?', '');
      }
    }
  }
  return url;
}
// export function removeSerialNumberQueryParam(obj: any): any {
//   if (!isUndefinedOrZeroLength(obj)) {
//     const keys = Object.keys(obj);
//     if (keys.includes(WORKFLOW.SN)) {
//       const newKeys = keys.filter((f) => f !== WORKFLOW.SN);
//       if (!isUndefinedOrZeroLength(newKeys)) {
//         const newObj = {};
//         newKeys.forEach((f) => {
//           newObj[f] = obj[f];
//         });
//         return newObj;
//       } else {
//         return {};
//       }
//     } else {
//       return obj;
//     }
//   }
//   return obj;
// }
export function isUrlForWorkflow(url: string): boolean {
  url = url.split('?')[0];
  const uiService = AppInjector.get(UIControllerService);
  if (!isUndefinedOrZeroLength(uiService.initialSerialNumberUrl)) {
    const checkUrl = uiService.initialSerialNumberUrl.split('?')[0];
    return url.startsWith(checkUrl);
  } else {
    return false;
  }
}
// export function addSerialNumberQueryParam(obj: any): any {
//   if (/(%3FSN%3D)\w+/.test(window.location.href) || /(\?SN\=)\w+/.test(window.location.href)) {
//     const url = decodeURIComponent(window.location.href);
//     const splits = url.split('?');
//     if (splits.length > 1) {
//       const queryParam = getQueryParamObject(url);
//       obj[WORKFLOW.SN] =
//         !isUndefinedOrZeroLength(queryParam) && !isUndefinedOrZeroLength(queryParam[WORKFLOW.SN]) ? queryParam[WORKFLOW.SN] : undefined;
//     }
//   }
//   return obj;
// }

export function setBodyActionMode(isFunction: boolean): void {
  const showMenuService = AppInjector.get(ShowMenuService);
  // console.log('issss', showMenuService);

  // showMenuService.isPresentingHamberger.next(false);
  // showMenuService.isPresentingLeftMenu.next(false);
  // showMenuService.isPresentingTopMenu.next(false);
  const body = document.querySelector('.k-container-sm');
  document.querySelector<HTMLElement>('.top-menu').style.display = 'none';
  document.querySelector<HTMLElement>('.left-menu').style.display = 'none';
  document.querySelector<HTMLElement>('.bar-miam').style.display = 'none';

  // leftMenu.style.display = 'none';
  // console.log('topMenu', topMenu);

  setTimeout(() => {
    switchClass(body, 'function-mode', isFunction);
  }, 1000);
}
export function setBodyNomalMode(): void {
  document.querySelector<HTMLElement>('.top-menu').style.display = 'block';
  document.querySelector<HTMLElement>('.left-menu').style.display = 'block';
  document.querySelector<HTMLElement>('.bar-miam').style.display = 'flex';
}
