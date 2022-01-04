"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIControllerService = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var constants_1 = require("app/shared/constants");
var value_function_1 = require("app/shared/functions/value.function");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var util_1 = require("util");
var UIControllerService = /** @class */ (function () {
    function UIControllerService(router, rendererFactory, 
    // private spinner: NgxSpinnerService,
    // private _location: Location,
    currentActivatedRoute) {
        this.router = router;
        this.rendererFactory = rendererFactory;
        this.currentActivatedRoute = currentActivatedRoute;
        this.fieldsAccSubject = new rxjs_1.Subject();
        this.readonlySubject = new rxjs_1.Subject();
        this.disabledSubject = new rxjs_1.Subject();
        this.relatedSubject = new rxjs_1.Subject();
        this.ddlLoadFirstFocusSubject = new rxjs_1.Subject();
        this.fullPageSubject = new rxjs_1.Subject();
        this.finishSpinnerListSubject = new rxjs_1.Subject();
        this.finishSpinnerItemSubject = new rxjs_1.Subject();
        this.snapshotHist = [];
        this.reqCounter = 0;
        this.reqsInfo = [];
        this.searchStored = [];
        this.fieldsAccessing = [];
        this.readonlyOrdinal = [];
        this.disableOrdinal = [];
        this.setFullOrdinal = [];
        this.setFullPageOrdinal = [];
        this.httpTrack = [];
        this.clientProcesses = [constants_1.CIENT_PROCESS.SETREADONLY];
        this.skipedPath = null;
        this.renderer = rendererFactory.createRenderer(null, null);
        this.isShowLog = false;
    }
    UIControllerService.prototype.setAppStorage = function (item) {
        localStorage.setItem('appStorage', item);
    };
    UIControllerService.prototype.getAppStorage = function () {
        return localStorage.getItem('appStorage');
    };
    UIControllerService.prototype.removeAppStorage = function () {
        localStorage.removeItem('appStorage');
    };
    UIControllerService.prototype.setReadonly = function (group) {
        var _this = this;
        if (this.readonlyOrdinal.length === 0) {
            this.setIncreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
            this.readonlyOrdinal.push({ value: group, fact: true });
            rxjs_1.interval(300)
                .pipe(operators_1.takeWhile(function (t) { return _this.readonlyOrdinal.length > 0; }))
                .subscribe(function (time) {
                // console.log(this.reqCounter, 'this.httpTrack', this.httpTrack, 'this.readonlyOrdinal', this.readonlyOrdinal);
                if (_this.httpStatus === constants_1.HTTPTYPE.CLIENTPROCESS) {
                    _this.readonlySubject.next(_this.readonlyOrdinal[0]);
                    _this.readonlyOrdinal.splice(0, 1);
                    if (_this.readonlyOrdinal.length === 0) {
                        _this.setDecreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
                    }
                }
            });
        }
        else {
            this.readonlyOrdinal.push({ value: group, fact: true });
        }
    };
    UIControllerService.prototype.setUIFieldsAccessing = function (fields) {
        var _this = this;
        if (fields.length > 0 && this.fieldsAccessing.length === 0) {
            this.setIncreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
            this.fieldsAccessing = value_function_1.setFieldConcat(this.fieldsAccessing, fields);
            rxjs_1.interval(300)
                .pipe(operators_1.takeWhile(function (t) { return _this.fieldsAccessing.length > 0; }))
                .subscribe(function (time) {
                if (_this.httpStatus === constants_1.HTTPTYPE.CLIENTPROCESS) {
                    _this.fieldsAccSubject.next(_this.fieldsAccessing);
                    _this.fieldsAccessing = [];
                    if (_this.fieldsAccessing.length === 0) {
                        _this.setDecreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
                    }
                }
            });
        }
        else {
            this.fieldsAccessing = value_function_1.setFieldConcat(this.fieldsAccessing, fields);
        }
    };
    UIControllerService.prototype.setDisabled = function (group) {
        var _this = this;
        if (this.disableOrdinal.length === 0) {
            this.setIncreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
            this.disableOrdinal.push({ value: group, fact: true });
            rxjs_1.interval(300)
                .pipe(operators_1.takeWhile(function (t) { return _this.disableOrdinal.length > 0; }))
                .subscribe(function (time) {
                if (_this.httpStatus === constants_1.HTTPTYPE.CLIENTPROCESS) {
                    _this.disabledSubject.next(_this.disableOrdinal[0]);
                    _this.disableOrdinal.splice(0, 1);
                    if (_this.disableOrdinal.length === 0) {
                        _this.setDecreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
                    }
                }
            });
        }
        else {
            this.disableOrdinal.push({ value: group, fact: true });
        }
    };
    UIControllerService.prototype.setFullControl = function (group) {
        var _this = this;
        if (this.setFullOrdinal.length === 0) {
            this.setIncreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
            this.setFullOrdinal.push({ value: group, fact: false });
            rxjs_1.interval(300)
                .pipe(operators_1.takeWhile(function (t) { return _this.setFullOrdinal.length > 0; }))
                .subscribe(function (time) {
                if (_this.httpStatus === constants_1.HTTPTYPE.CLIENTPROCESS) {
                    _this.readonlySubject.next(_this.setFullOrdinal[0]);
                    _this.disabledSubject.next(_this.setFullOrdinal[0]);
                    _this.setFullOrdinal.splice(0, 1);
                    if (_this.setFullOrdinal.length === 0) {
                        _this.setDecreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
                    }
                }
            });
        }
        else {
            this.setFullOrdinal.push({ value: group, fact: false });
        }
    };
    UIControllerService.prototype.setFullPage = function () {
        var _this = this;
        if (this.setFullPageOrdinal.length === 0) {
            this.setIncreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
            this.setFullPageOrdinal.push({ value: constants_1.Ordinal.Clear, fact: false });
            rxjs_1.interval(300)
                .pipe(operators_1.takeWhile(function (t) { return _this.setFullPageOrdinal.length > 0; }))
                .subscribe(function (time) {
                if (_this.httpStatus === constants_1.HTTPTYPE.CLIENTPROCESS) {
                    _this.readonlySubject.next(_this.setFullPageOrdinal[0]);
                    _this.disabledSubject.next(_this.setFullPageOrdinal[0]);
                    _this.setFullPageOrdinal.splice(0, 1);
                    if (_this.setFullPageOrdinal.length === 0) {
                        _this.setDecreaseReqCounter(constants_1.CIENT_PROCESS.SETREADONLY);
                    }
                }
            });
        }
        else {
            this.setFullPageOrdinal.push({ value: constants_1.Ordinal.Clear, fact: false });
        }
        // setTimeout(() => {
        //     const model: OrdinalModel = { value: Ordinal.Clear, fact: false };
        //     this.readonlySubject.next(model);
        //     this.disabledSubject.next(model);
        // }, 100);
    };
    // ========= new navigator ==== //
    UIControllerService.prototype.setHistSnapshot = function (snapshot) {
        this.reqsInfo = [];
        var site = snapshot.params['site'];
        var main = snapshot.params['main'];
        if (util_1.isNullOrUndefined(site) && !util_1.isNullOrUndefined(main)) {
            site = main.split(':')[0];
        }
        site = value_function_1.getSiteFormParam(site);
        this.currentSite = site;
        this.branchType = value_function_1.pathToBranchType(site);
        // const latestPath = this.snapshotHist.slice(-1).pop();
        // if (isNullOrUndefined(latestPath)
        //     || (snapshot['_routerState'].url !== latestPath['_routerState'].url)) {
        this.snapshotHist.push(snapshot);
        if (this.snapshotHist.length > 10) {
            this.snapshotHist.splice(0, 1);
        }
        // }
    };
    UIControllerService.prototype.getHistSnapshot = function () {
        return this.snapshotHist;
    };
    UIControllerService.prototype.setHidePopover = function () {
        var _this = this;
        var bodies = document.querySelectorAll('div.i-panel-body');
        bodies.forEach(function (body) {
            _this.renderer.addClass(body, 'hide-popover');
        });
        setTimeout(function () {
            bodies.forEach(function (body) {
                _this.renderer.removeClass(body, 'hide-popover');
            });
        }, 5000);
    };
    UIControllerService.prototype.setInitialMode = function (event) {
        var _this = this;
        if (this.isShowLog) {
        }
        this.setHidePopover();
        var arrPath = event.url.split('/fn/');
        if (arrPath.length > 1) {
            this.primaryUrl = decodeURIComponent(this.replaceToPath(arrPath[0].replace(/[/$]/g, '')));
            var tmpId = arrPath[0].split(':')[arrPath[0].split(':').length - 1];
            // check for encoded char
            if (tmpId.includes('%')) {
                var tmpId_decode = decodeURIComponent(tmpId);
                if (tmpId_decode.split('?').length > 1) {
                    tmpId = tmpId_decode[0];
                }
            }
            this.primaryId = value_function_1.guidValidation(tmpId) ? tmpId : null;
            if (util_1.isNullOrUndefined(this.relatedStartUrl)) {
                if (util_1.isNullOrUndefined(this.snapshotHist.slice(-1).pop().params['id'])) {
                    this.relatedStartType = constants_1.PathType.LIST;
                    if (event.url.includes('$')) {
                        var arrStart = arrPath[0].split('!');
                        arrStart.forEach(function (f, i) {
                            if (f.includes('$')) {
                                _this.relatedStartUrl = f[i + 1];
                            }
                        });
                    }
                    else {
                        this.relatedStartUrl = "/" + arrPath[1];
                    }
                }
                else {
                    if (this.getIsItem(this.snapshotHist.slice(-1).pop().params['main'])) {
                        this.relatedStartType = constants_1.PathType.ITEM;
                    }
                    else {
                        this.relatedStartType = constants_1.PathType.LIST;
                    }
                    if (event.url.includes('$')) {
                        var arrStart_1 = arrPath[0].split('!');
                        arrStart_1.forEach(function (f, i) {
                            if (f.includes('$')) {
                                _this.relatedStartUrl = arrStart_1[i + 1];
                            }
                        });
                    }
                    else {
                        this.relatedStartUrl = value_function_1.removeUrlId("/" + arrPath[1]);
                    }
                }
            }
            if (this.isShowLog) {
                console.log('fullPageSubject.next 1');
            }
            var _isFunction = event.url.includes("fn/functions/") ||
                event.url.includes("reports/") ||
                event.url.includes("fn/workflow/");
            if (!_isFunction) {
                this.skipedUrl = null;
            }
            this.fullPageSubject.next(_isFunction);
        }
        else {
            if (event.url.includes('?')) {
                this.initialQueryStringUrl = event.url;
            }
            this.primaryUrl = null;
            this.primaryId = null;
            this.relatedStartUrl = null;
            if (this.isShowLog) {
                console.log('fullPageSubject.next 2');
            }
            this.fullPageSubject.next(false);
        }
        this.relatedSubject.next(!util_1.isNullOrUndefined(this.relatedStartUrl));
    };
    UIControllerService.prototype.getFunctionMode = function (fnUrl, queryParam) {
        if (queryParam === void 0) { queryParam = undefined; }
        if (util_1.isNullOrUndefined(this.relatedStartUrl)) {
            this.beforeSkipUrl = this.replaceToPath(this.router.url);
            this.primaryUrl = decodeURIComponent(this.replaceToPath(this.router.url.replace('/', '')));
            this.primaryId = this.snapshotHist.slice(-1).pop().params['id'];
        }
        else {
            if (util_1.isNullOrUndefined(this.beforeSkipUrl)) {
                this.beforeSkipUrl = this.replaceToParams(this.router.url.split('/fn/')[0].replace('/', '')) + "/fn/" + this.router.url.split('/fn/')[1];
            }
            this.primaryUrl = this.router.url.split('/fn/')[0];
            this.primaryUrl = this.replaceToPath(this.primaryUrl.replace('/', ''));
        }
        this.skipedUrl = fnUrl;
        this.router.navigate([
            decodeURIComponent("/" + this.replaceToParams(this.primaryUrl) + "/fn/" + fnUrl),
        ], {
            skipLocationChange: true,
            queryParams: queryParam,
        });
    };
    UIControllerService.prototype.setRemovePrimaryUrl = function () {
        this.initialQueryStringUrl = null;
        this.primaryUrl = null;
    };
    UIControllerService.prototype.getNavigator = function (url) {
        if (url === void 0) { url = null; }
        if (this.isShowLog) {
            console.log('getNavigator');
        }
        var currentUrl = util_1.isNullOrUndefined(this.router.url.split('/fn/')[1])
            ? null
            : "/" + this.router.url.split('/fn/')[1];
        if (!util_1.isNullOrUndefined(this.relatedStartUrl)) {
            if (this.relatedStartType === constants_1.PathType.ITEM) {
                currentUrl = value_function_1.removeUrlId(currentUrl);
            }
        }
        if (url === constants_1.AppConst.HOMEURL) {
            this.skipedUrl = null;
            this.relatedStartUrl = null;
            if (this.isShowLog) {
                console.log('fullPageSubject.next 5');
            }
            this.fullPageSubject.next(false);
            this.router.navigate([constants_1.AppConst.HOMEURL]);
        }
        else if (util_1.isNullOrUndefined(url) || url === '') {
            var arrRel = this.router.url.split('!');
            if (util_1.isNullOrUndefined(arrRel[1]) && util_1.isNullOrUndefined(this.skipedUrl)) {
                this.relatedStartUrl = null;
                if (util_1.isNullOrUndefined(this.primaryUrl)) {
                    var beforeThis = this.snapshotHist[this.snapshotHist.length - 2];
                    if (!util_1.isNullOrUndefined(beforeThis)) {
                        this.navigateRoute("" + beforeThis['_routerState'].url);
                    }
                    else {
                        this.navigateRoute(this.currentSite + "/home");
                    }
                }
                else {
                    this.navigateRoute(this.primaryUrl.replace('$', ''));
                }
            }
            else if (!util_1.isNullOrUndefined(this.skipedUrl)) {
                this.navigateRoute(this.beforeSkipUrl);
                this.beforeSkipUrl = null;
            }
            else {
                this.navigateRoute(this.getUrlLastRelated(this.router.url.replace('$', '')));
            }
            this.skipedUrl = null;
            if (this.isShowLog) {
                console.log('fullPageSubject.next 6');
            }
            this.fullPageSubject.next(false);
        }
        else if (util_1.isNullOrUndefined(this.primaryUrl)) {
            if (this.isShowLog) {
                console.log('fullPageSubject.next 7');
            }
            this.fullPageSubject.next(false);
            this.relatedStartUrl = null;
            this.skipedUrl = null;
            if (this.isEqualToInitQueryStringRoute(this.currentSite + "/" + url)) {
                this.navigateRoute(this.initialQueryStringUrl);
            }
            else {
                if (!this.containsInitQueryStringRoute(this.currentSite + "/" + url)) {
                    this.initialQueryStringUrl = null;
                }
                this.router.navigate([this.currentSite + "/" + url]);
            }
        }
        else if (!util_1.isNullOrUndefined(this.skipedUrl)) {
            url = value_function_1.replaceAll(url, '//', '/');
            if (util_1.isNullOrUndefined(this.relatedStartUrl)) {
                this.router.navigate(["/" + url], { skipLocationChange: true });
            }
            else {
                if (value_function_1.isCreateUrl(this.beforeSkipUrl) && value_function_1.isEditUrl(url)) {
                    if (this.isShowLog) {
                        console.log('fullPageSubject.next 8');
                    }
                    this.fullPageSubject.next(false);
                    this.skipedUrl = null;
                    this.router.navigate([this.currentSite + "/" + url]);
                }
                else {
                    var afterFn = this.beforeSkipUrl.split('/fn')[1];
                    if (util_1.isNullOrUndefined(afterFn) ||
                        (afterFn === url && !this.router.url.includes('/fn/')) ||
                        !url.includes("fn/functions/")) {
                        if (this.isShowLog) {
                            console.log('fullPageSubject.next 20');
                        }
                        this.fullPageSubject.next(false);
                        this.skipedUrl = null;
                        if (value_function_1.trimStart(this.setRemoveIdPath("" + this.currentSite + url), '/') === value_function_1.trimStart(this.setRemoveIdPath(this.beforeSkipUrl), '/')) {
                            this.navigateRoute("" + this.currentSite + url);
                        }
                        else {
                            this.navigateRoute(this.beforeSkipUrl);
                        }
                        this.beforeSkipUrl = null;
                    }
                    else {
                        if (this.isShowLog) {
                            console.log('fullPageSubject.next 21');
                        }
                        this.fullPageSubject.next(true);
                        var preUrl = this.beforeSkipUrl.split('/fn')[0] + "/fn" + url;
                        this.router.navigate([
                            decodeURIComponent(this.beforeSkipUrl.split('/fn')[0] + "/fn" + url),
                        ], {
                            skipLocationChange: true,
                        });
                    }
                }
            }
        }
        else if (this.relatedStartUrl === currentUrl ||
            this.skipedUrl === currentUrl) {
            // start from related item view > back to primary
            if (this.relatedStartType === constants_1.PathType.ITEM) {
                if (this.isShowLog) {
                    console.log('fullPageSubject.next 9');
                }
                this.fullPageSubject.next(false);
                this.relatedStartUrl = null;
                this.skipedUrl = null;
                this.navigateRoute(this.primaryUrl);
            }
            else {
                if (this.isShowLog) {
                    console.log('fullPageSubject.next 10');
                }
                this.fullPageSubject.next(!util_1.isNullOrUndefined(this.skipedUrl));
                this.router.navigate([
                    decodeURIComponent(this.replaceToParams(this.primaryUrl) + "/fn" + url),
                ]);
            }
        }
        else {
            if (this.isShowLog) {
                console.log('fullPageSubject.next 11');
            }
            this.fullPageSubject.next(!util_1.isNullOrUndefined(this.skipedUrl));
            this.initialQueryStringUrl = null;
            this.router.navigate([
                decodeURIComponent(this.replaceToParams(this.primaryUrl) + "/fn" + url),
            ]);
        }
    };
    UIControllerService.prototype.replaceToPath = function (url) {
        url = url.replace('TitemT', '');
        return value_function_1.replaceAll(url, ':', '/');
    };
    UIControllerService.prototype.replaceToParams = function (url, special) {
        if (special === void 0) { special = null; }
        if (!value_function_1.isNullOrUndefOrEmpty(special)) {
            var arr = url.split('/');
            arr[1] = "" + arr[1] + special;
            url = '';
            arr.forEach(function (a) {
                url = url + "/" + a;
            });
            url = url.replace('/', '');
        }
        return value_function_1.replaceAll(url, '/', ':');
    };
    UIControllerService.prototype.getUrlLastRelated = function (url) {
        var arrFn = url.split('/fn/');
        arrFn = arrFn[0].split('!');
        return arrFn[0] + "/fn/" + this.replaceToPath(arrFn.slice(-1).pop());
    };
    UIControllerService.prototype.getIsItem = function (url) {
        var paths = url.split(':');
        var isItem = false;
        paths.forEach(function (path) {
            if (path === 'TitemT') {
                isItem = true;
            }
        });
        return isItem;
    };
    UIControllerService.prototype.setRemoveIdPath = function (url) {
        var arr = url.split('/');
        var id = arr[arr.length - 1];
        if (value_function_1.isUuid(id)) {
            return url.replace("/" + id, '');
        }
        else {
            return url;
        }
    };
    UIControllerService.prototype.setAuthorizedBySite = function (site) {
        var _this = this;
        return value_function_1.isNullOrUndefOrEmpty(site.find(function (o) { return o === _this.currentSite; }))
            ? false
            : true;
    };
    UIControllerService.prototype.setIncreaseReqCounter = function (url) {
        var _this = this;
        var req = { url: url, begin: new Date().getTime() };
        this.reqsInfo.unshift(req);
        this.httpTrack.unshift(url);
        this.reqCounter++;
        if (this.reqCounter === 1) {
            if (this.httpTrack.every(function (e) { return _this.clientProcesses.some(function (s) { return s === e; }); })) {
                this.httpStatus = constants_1.HTTPTYPE.CLIENTPROCESS;
            }
            else {
                this.httpStatus = constants_1.HTTPTYPE.REQUESTING;
            }
            // this.spinner.show();
        }
    };
    UIControllerService.prototype.setDecreaseReqCounter = function (url) {
        var _this = this;
        var index = this.reqsInfo.findIndex(function (f) { return f.url === url; });
        var iTrack = this.httpTrack.findIndex(function (f) { return f === url; });
        if (index > -1) {
            this.reqsInfo[index].duration =
                new Date().getTime() - this.reqsInfo[index].begin;
        }
        if (iTrack > -1) {
            this.httpTrack.splice(iTrack, 1);
        }
        if (this.httpTrack.every(function (e) { return _this.clientProcesses.some(function (s) { return s === e; }); })) {
            this.httpStatus = constants_1.HTTPTYPE.CLIENTPROCESS;
        }
        if (this.reqCounter === 1) {
            this.reqCounter--;
            if (this.reqCounter === 0) {
                setTimeout(function () {
                    if (_this.reqCounter === 0) {
                        _this.httpStatus = constants_1.HTTPTYPE.RESPONSED;
                        // this.spinner.hide();
                    }
                }, 1000);
            }
        }
        else {
            this.reqCounter--;
        }
    };
    UIControllerService.prototype.setSearchStored = function (search) {
        var main = this.snapshotHist.slice(-1).pop().params['main'];
        var index = this.searchStored.findIndex(function (s) { return s.tableKey === search.tableKey; });
        if (index > -1) {
            this.searchStored.splice(index, 1);
        }
        if (search.conditions.some(function (s) {
            return (!value_function_1.isNullOrUndefOrEmpty(s.value) || !value_function_1.isNullOrUndefOrEmpty(s.values)) &&
                !s.isParentKey;
        })) {
            this.searchStored.push(JSON.parse(JSON.stringify(search)));
        }
    };
    UIControllerService.prototype.getSearchStored = function (tableKey) {
        var dels = [];
        for (var i = 0; i < this.searchStored.length; i++) {
            if (!value_function_1.isPathWithinUrl(this.searchStored[i].urlPath, this.router)) {
                dels.push(i);
            }
        }
        for (var i = 0; i < dels.length; i++) {
            this.searchStored.splice(dels[i], 1);
        }
        return this.searchStored.find(function (f) { return f.tableKey === tableKey; });
    };
    UIControllerService.prototype.setInitStored = function (index) {
        if (index === void 0) { index = ''; }
        this.searchStored = [];
    };
    UIControllerService.prototype.setBlockBody = function () {
        var body = document.querySelector('body');
        if (!body.classList.contains('iv-viewonly')) {
            this.renderer.addClass(body, 'iv-viewonly');
        }
    };
    UIControllerService.prototype.navigateRoute = function (path) {
        var path_decoded = decodeURIComponent(path);
        var route = path_decoded.split('?');
        if (route.length > 1) {
            var routePath = route[0];
            if (route.length > 2) {
                for (var i = 1; i < route.slice(route.length - 2).length; i++) {
                    routePath = routePath.concat('?', route[i]);
                }
            }
            this.router.navigate([routePath], {
                queryParams: value_function_1.getQueryParamObject(route.slice(-1).pop()),
            });
        }
        else {
            this.router.navigate([path_decoded]);
        }
    };
    UIControllerService.prototype.containsInitQueryStringRoute = function (path) {
        path = '/' + value_function_1.replaceAll(path, '//', '/');
        if (value_function_1.isUndefinedOrZeroLength(this.initialQueryStringUrl)) {
            return false;
        }
        var routeWithNoQS = this.initialQueryStringUrl.split('?')[0];
        return decodeURIComponent(path).includes(routeWithNoQS);
    };
    UIControllerService.prototype.isEqualToInitQueryStringRoute = function (path) {
        path = '/' + value_function_1.replaceAll(path, '//', '/');
        if (value_function_1.isUndefinedOrZeroLength(this.initialQueryStringUrl)) {
            return false;
        }
        var routeWithNoQS = this.initialQueryStringUrl.split('?')[0];
        if (routeWithNoQS.includes('/wf')) {
            routeWithNoQS = routeWithNoQS.replace('/wf', '');
        }
        return path === routeWithNoQS;
    };
    UIControllerService.prototype.getGroupOptions = function () {
        return new rxjs_1.Observable(function (observer) {
            setTimeout(function () {
                var _group = document.getElementsByClassName('ui-fieldset-legend');
                if (_group.length === 0) {
                    _group = document.getElementsByClassName('p-fieldset-legend');
                }
                if (value_function_1.isUndefinedOrZeroLength(_group)) {
                    observer.next([]);
                }
                var arr = Array.from(_group);
                observer.next(arr.map(function (item, idx) {
                    var content = item.nextElementSibling.querySelector('.ui-fieldset-content');
                    if (util_1.isNullOrUndefined(content)) {
                        content = item.nextElementSibling.querySelector('.p-fieldset-content');
                    }
                    var elements = content.querySelectorAll(constants_1.ElementType.INPUT + "," + constants_1.ElementType.P_CALENDAR + "," + constants_1.ElementType.P_CHECKBOX + ",\n                    " + constants_1.ElementType.P_DROPDOWN + "," + constants_1.ElementType.P_INPUTSWITCH + "," + constants_1.ElementType.P_MULTISELECT + "," + constants_1.ElementType.P_RADIOBUTTON + "\n                    ," + constants_1.ElementType.TEXTAREA);
                    return {
                        label: item.textContent,
                        command: function () {
                            window.scrollTo({
                                top: item.offsetTop - 100,
                                left: 0,
                                behavior: 'smooth',
                            });
                            if (elements[0].tagName === constants_1.ElementType.TEXTAREA ||
                                elements[0].tagName === constants_1.ElementType.INPUT) {
                                elements[0].focus();
                            }
                            else {
                                var input = elements[0].querySelectorAll("" + constants_1.ElementType.INPUT);
                                input[0].focus();
                            }
                        },
                    };
                }));
            }, 1000);
        });
    };
    UIControllerService.prototype.getQueryStringValue = function (key) {
        var value = this.currentActivatedRoute.snapshot.queryParamMap.get(key);
        if (value_function_1.isUndefinedOrZeroLength(decodeURIComponent(value)) ||
            decodeURIComponent(value) === 'null' ||
            decodeURIComponent(value) === 'undefined') {
            return '';
        }
        else {
            return decodeURIComponent(value);
        }
    };
    UIControllerService.prototype.isWorkFlowMode = function () {
        if (/(%3FSN%3D)\w+/.test(window.location.href) ||
            /(\?SN\=)\w+/.test(window.location.href)) {
            return true;
        }
        else if (!value_function_1.isUndefinedOrZeroLength(this.getQueryStringValue(constants_1.WORKFLOW.SN))) {
            return true;
        }
        else {
            return false;
        }
    };
    UIControllerService.prototype.getKey = function (name) {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === name; });
        if (idx >= 0) {
            return decodeURIComponent(routeParam[idx + 1].path).split('?')[0];
        }
        return constants_1.EmptyUuid;
    };
    UIControllerService.prototype.getRelatedInfoOriginTableName = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === 'info'; });
        if (idx >= 0) {
            if (decodeURIComponent(routeParam[idx - 2])
                .split('?')[0]
                .includes('-child')) {
                return decodeURIComponent(routeParam[idx - 4]).split('?')[0];
            }
            else {
                return decodeURIComponent(routeParam[idx - 2]).split('?')[0];
            }
        }
        return null;
    };
    UIControllerService.prototype.getRelatedInfoParentTableName = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var reverseRouteParm = routeParam.slice().reverse();
        var idx = reverseRouteParm.findIndex(function (o) { return o.path === 'info'; });
        if (idx >= 0) {
            return decodeURIComponent(reverseRouteParm[idx + 2]).split('?')[0];
        }
        return null;
    };
    UIControllerService.prototype.getParentTableName = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var reverseRouteParm = routeParam.slice().reverse();
        return reverseRouteParm[0].path;
    };
    UIControllerService.prototype.getRelatedInfoActiveTableName = function () {
        return this.getActiveTableName('info');
    };
    UIControllerService.prototype.getWorkflowActiveTableName = function () {
        return this.getActiveTableName('workflow');
    };
    UIControllerService.prototype.getWorkflowActiveTableKey = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === 'workflow'; });
        if (idx >= 0) {
            return decodeURIComponent(routeParam[idx - 1]).split('?')[0];
        }
        return constants_1.EmptyUuid;
    };
    UIControllerService.prototype.getActiveTableName = function (param) {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === param; });
        if (idx >= 0) {
            return decodeURIComponent(routeParam[idx + 1]).split('?')[0];
        }
        return null;
    };
    UIControllerService.prototype.getRelatedInfoOriginTableKey = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === 'info'; });
        if (idx >= 0) {
            if (decodeURIComponent(routeParam[idx - 2])
                .split('?')[0]
                .includes('-child')) {
                return decodeURIComponent(routeParam[idx - 3]).split('?')[0];
            }
            else {
                return decodeURIComponent(routeParam[idx - 1]).split('?')[0];
            }
        }
        return constants_1.EmptyUuid;
    };
    UIControllerService.prototype.getRelatedInfoParentTableKey = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var reverseRouteParm = routeParam.slice().reverse();
        var idx = reverseRouteParm.findIndex(function (o) { return o.path === 'info'; });
        if (idx >= 0) {
            return decodeURIComponent(reverseRouteParm[idx + 1]).split('?')[0];
        }
        return constants_1.EmptyUuid;
    };
    UIControllerService.prototype.getRelatedInfoActiveTableKey = function () {
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === 'info'; });
        if (idx >= 0) {
            return decodeURIComponent(routeParam[idx + 2]).split('?')[0];
        }
        return constants_1.EmptyUuid;
    };
    UIControllerService.prototype.toRelatedInfo = function (param) {
        return param;
    };
    UIControllerService.prototype.toFunction = function (param) {
        return param;
    };
    UIControllerService.prototype.getMasterRoute = function (shift) {
        if (shift === void 0) { shift = 0; }
        var routeParam = this.snapshotHist.slice(-1).pop()['_urlSegment'].segments;
        var idx = routeParam.findIndex(function (o) { return o.path === 'back' || o.path.includes('back!'); });
        if (idx >= 0) {
            return decodeURIComponent(routeParam[idx + 1 + shift].path).split('?')[0];
        }
        return null;
    };
    UIControllerService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            core_1.RendererFactory2,
            router_1.ActivatedRoute])
    ], UIControllerService);
    return UIControllerService;
}());
exports.UIControllerService = UIControllerService;
