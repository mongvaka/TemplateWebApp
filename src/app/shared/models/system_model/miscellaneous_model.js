"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceModel = exports.ResponseModel = exports.FieldAccessing = exports.RemovedUrl = exports.PageInformationModel = exports.FormValidationModel = exports.DataServiceModel = exports.GridFilterModel = exports.PathParamModel = exports.OrdinalModel = exports.MessageModel = exports.TranslateModel = exports.FormatConfigModel = exports.ActionHistoryStartflowOption = exports.ToastTimeout = exports.K2WorkflowPath = exports.DeploymentConfig = exports.InterfaceWithSystems = exports.ConfigurationModel = exports.ColumnModel = exports.OptionModel = exports.BaseOption = exports.DummyParam = exports.DummyResult = exports.NotificationResponse = exports.ISubjectType = exports.IReferenceType = exports.IFileName = exports.IKey = exports.IExportParam = exports.ISizing = exports.IColumnWidth = exports.IRequest = exports.ImportBankFile = exports.IConfirmation = exports.SystemLogModel = exports.LoggingModel = exports.JoinCondtion = exports.RefViewModel = exports.Environment = exports.FileUploadStyle = exports.FileInformation = exports.FileUpload = exports.FileModel = exports.ErrorModel = exports.ErrorResponse = exports.DataGridModel = exports.PaginationModel = exports.RowIdentity = exports.Deletion = void 0;
exports.KisDropdownOnFocusModel = exports.DocConVerifyTypeModel = exports.RefTypeModel = exports.RelatedKeyModel = exports.BaseServiceModel2 = void 0;
var constant_1 = require("../../constants/constant");
var enum_system_1 = require("../../constants/enum_system");
// import { UserDataService } from 'core/services/user-data.service';
// import { NotificationService } from 'core/services/notification.service';
// import { AccessRightService } from 'core/services/access-right.service';
// import { DataGatewayService } from 'core/services/data-gateway.service';
// import { BaseDropdownComponent } from 'core/components/base/base.dropdown.component';
// import { ValidationService } from 'shared/services/validation.service';
// import { FileService } from 'core/services/file.service';
// import { AccessModeView } from '../viewModel';
// import { K2Service } from 'core/services/k2.service';
var Deletion = /** @class */ (function () {
    function Deletion() {
        this.uuid = null;
    }
    return Deletion;
}());
exports.Deletion = Deletion;
var RowIdentity = /** @class */ (function () {
    function RowIdentity() {
        this.uuid = null;
    }
    return RowIdentity;
}());
exports.RowIdentity = RowIdentity;
var PaginationModel = /** @class */ (function () {
    function PaginationModel() {
    }
    return PaginationModel;
}());
exports.PaginationModel = PaginationModel;
var DataGridModel = /** @class */ (function () {
    function DataGridModel() {
    }
    return DataGridModel;
}());
exports.DataGridModel = DataGridModel;
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse() {
    }
    return ErrorResponse;
}());
exports.ErrorResponse = ErrorResponse;
var ErrorModel = /** @class */ (function () {
    function ErrorModel() {
    }
    return ErrorModel;
}());
exports.ErrorModel = ErrorModel;
var FileModel = /** @class */ (function () {
    function FileModel() {
    }
    return FileModel;
}());
exports.FileModel = FileModel;
var FileUpload = /** @class */ (function () {
    function FileUpload() {
    }
    return FileUpload;
}());
exports.FileUpload = FileUpload;
var FileInformation = /** @class */ (function () {
    function FileInformation() {
        this.isRemovable = true;
    }
    return FileInformation;
}());
exports.FileInformation = FileInformation;
var FileUploadStyle = /** @class */ (function () {
    function FileUploadStyle() {
    }
    return FileUploadStyle;
}());
exports.FileUploadStyle = FileUploadStyle;
var Environment = /** @class */ (function () {
    function Environment() {
    }
    return Environment;
}());
exports.Environment = Environment;
var RefViewModel = /** @class */ (function () {
    function RefViewModel() {
    }
    return RefViewModel;
}());
exports.RefViewModel = RefViewModel;
var JoinCondtion = /** @class */ (function () {
    function JoinCondtion() {
        this.data = [];
        this.equal = true;
    }
    return JoinCondtion;
}());
exports.JoinCondtion = JoinCondtion;
var LoggingModel = /** @class */ (function () {
    function LoggingModel() {
        this.timestamp = null;
        this.logType = 0; // System, Normal
        this.messageType = null; // error, warn, info, success
        this.topic = null;
        this.message = null;
        this.messages = null;
        this.origin = null; // component title, SYSTEM (logType = System)
        this.seen = false;
        this.systemLogDetail = null;
    }
    return LoggingModel;
}());
exports.LoggingModel = LoggingModel;
var SystemLogModel = /** @class */ (function () {
    function SystemLogModel() {
        this.startTime = 0;
        this.finishTime = 0;
        this.elapsedTime = 0;
        this.httpMethod = null; // GET, POST, PUT, DELETE, PATCH
        this.reqUrl = null;
        this.statusCode = null;
        this.statusText = null;
        this.stackTrace = null;
        this.reqBody = null; // encrypted
        this.isError = false;
        this.requestId = null;
        this.displayDetail = false;
        this.displayStartTime = null;
        this.displayFinishTime = null;
    }
    return SystemLogModel;
}());
exports.SystemLogModel = SystemLogModel;
var IConfirmation = /** @class */ (function () {
    function IConfirmation() {
    }
    return IConfirmation;
}());
exports.IConfirmation = IConfirmation;
var ImportBankFile = /** @class */ (function () {
    function ImportBankFile() {
        this.fileUpload = new FileUpload();
        this.companyUUID = null;
        this.description = null;
    }
    return ImportBankFile;
}());
exports.ImportBankFile = ImportBankFile;
var IRequest = /** @class */ (function () {
    function IRequest() {
    }
    return IRequest;
}());
exports.IRequest = IRequest;
var IColumnWidth = /** @class */ (function () {
    function IColumnWidth() {
    }
    return IColumnWidth;
}());
exports.IColumnWidth = IColumnWidth;
var ISizing = /** @class */ (function () {
    function ISizing() {
    }
    return ISizing;
}());
exports.ISizing = ISizing;
var IExportParam = /** @class */ (function () {
    function IExportParam() {
    }
    return IExportParam;
}());
exports.IExportParam = IExportParam;
var IKey = /** @class */ (function () {
    function IKey() {
    }
    return IKey;
}());
exports.IKey = IKey;
var IFileName = /** @class */ (function () {
    function IFileName() {
    }
    return IFileName;
}());
exports.IFileName = IFileName;
var IReferenceType = /** @class */ (function () {
    function IReferenceType() {
    }
    return IReferenceType;
}());
exports.IReferenceType = IReferenceType;
var ISubjectType = /** @class */ (function () {
    function ISubjectType() {
    }
    return ISubjectType;
}());
exports.ISubjectType = ISubjectType;
var NotificationResponse = /** @class */ (function () {
    function NotificationResponse() {
    }
    return NotificationResponse;
}());
exports.NotificationResponse = NotificationResponse;
var DummyResult = /** @class */ (function () {
    function DummyResult() {
    }
    return DummyResult;
}());
exports.DummyResult = DummyResult;
var DummyParam = /** @class */ (function () {
    function DummyParam() {
    }
    return DummyParam;
}());
exports.DummyParam = DummyParam;
var BaseOption = /** @class */ (function () {
    function BaseOption() {
    }
    return BaseOption;
}());
exports.BaseOption = BaseOption;
var OptionModel = /** @class */ (function () {
    function OptionModel() {
        this.columns = [];
        this.showPaginator = true;
        this.authorization = enum_system_1.AccessMode.full;
    }
    return OptionModel;
}());
exports.OptionModel = OptionModel;
var ColumnModel = /** @class */ (function () {
    function ColumnModel() {
        this.sorting = enum_system_1.SortType.NONE;
        this.width = { width: '100px' };
        this.operator = constant_1.Operators.AND;
        this.disabled = false;
        this.disabledFilter = false;
        this.value = null;
        this.values = [];
        this.equalityOperator = constant_1.Operators.EQUAL;
        this.bracket = enum_system_1.BracketType.None;
    }
    return ColumnModel;
}());
exports.ColumnModel = ColumnModel;
var ConfigurationModel = /** @class */ (function () {
    function ConfigurationModel() {
        this.defaultLanguage = null;
        this.dateFormat = null;
        this.inputDateFormat = null;
        this.inputDateTimeFormat = null;
        this.environments = null;
        this.acceptedFileFormat = null;
        this.fileSizeLimit = 0;
        this.encryptionKey = null;
        this.systemLogLevel = null; // Error, All
        this.interfaces = null;
        this.deploymentConfig = null;
        this.columnsWidth = null;
        this.k2WorkflowPath = null;
        this.excelfileNameFormat = null;
        this.toastTimeout = null;
        this.actionHistoryStartflowOption = null;
    }
    return ConfigurationModel;
}());
exports.ConfigurationModel = ConfigurationModel;
var InterfaceWithSystems = /** @class */ (function () {
    function InterfaceWithSystems() {
        this.MicrosoftAX = false;
        this.K2 = false;
    }
    return InterfaceWithSystems;
}());
exports.InterfaceWithSystems = InterfaceWithSystems;
var DeploymentConfig = /** @class */ (function () {
    function DeploymentConfig() {
        this.enableEncryption = false;
        this.errorMsgLevel = null; // dev, prod
    }
    return DeploymentConfig;
}());
exports.DeploymentConfig = DeploymentConfig;
var K2WorkflowPath = /** @class */ (function () {
    function K2WorkflowPath() {
        this.MainFloder = null;
        this.ApplicationWorkflow = null;
        this.AgreementWorkflow = null;
        this.CollectionActivityTranWorkflow = null;
        this.CreditAppRequestWorkflow = null;
        this.PurchaseWorkflow = null;
        this.PurchaseEmailWorkflow = null;
        this.ViewFlowURL = null;
    }
    return K2WorkflowPath;
}());
exports.K2WorkflowPath = K2WorkflowPath;
var ToastTimeout = /** @class */ (function () {
    function ToastTimeout() {
        this.error = 10; // seconds
        this.success = 5; // seconds
        this.warning = 10; // seconds
        this.info = 5; // seconds
    }
    return ToastTimeout;
}());
exports.ToastTimeout = ToastTimeout;
var ActionHistoryStartflowOption = /** @class */ (function () {
    function ActionHistoryStartflowOption() {
        this.activityName = null;
        this.actionName = null;
    }
    return ActionHistoryStartflowOption;
}());
exports.ActionHistoryStartflowOption = ActionHistoryStartflowOption;
var FormatConfigModel = /** @class */ (function () {
    function FormatConfigModel() {
        this.type = null;
        this.max = 0;
        this.min = 0;
        this.grouping = false;
        this.locale = null;
        this.currency = null;
        this.fractionDigits = 0;
        this.suffix = null;
    }
    return FormatConfigModel;
}());
exports.FormatConfigModel = FormatConfigModel;
var TranslateModel = /** @class */ (function () {
    function TranslateModel() {
        this.code = null;
        this.parameters = [];
        this.type = null;
        this.row = null;
    }
    return TranslateModel;
}());
exports.TranslateModel = TranslateModel;
var MessageModel = /** @class */ (function () {
    function MessageModel() {
    }
    return MessageModel;
}());
exports.MessageModel = MessageModel;
var OrdinalModel = /** @class */ (function () {
    function OrdinalModel() {
    }
    return OrdinalModel;
}());
exports.OrdinalModel = OrdinalModel;
var PathParamModel = /** @class */ (function () {
    function PathParamModel() {
    }
    return PathParamModel;
}());
exports.PathParamModel = PathParamModel;
var GridFilterModel = /** @class */ (function () {
    function GridFilterModel() {
    }
    return GridFilterModel;
}());
exports.GridFilterModel = GridFilterModel;
var DataServiceModel = /** @class */ (function () {
    function DataServiceModel() {
    }
    return DataServiceModel;
}());
exports.DataServiceModel = DataServiceModel;
var FormValidationModel = /** @class */ (function () {
    function FormValidationModel() {
    }
    return FormValidationModel;
}());
exports.FormValidationModel = FormValidationModel;
var PageInformationModel = /** @class */ (function () {
    function PageInformationModel() {
    }
    return PageInformationModel;
}());
exports.PageInformationModel = PageInformationModel;
var RemovedUrl = /** @class */ (function () {
    function RemovedUrl() {
    }
    return RemovedUrl;
}());
exports.RemovedUrl = RemovedUrl;
var FieldAccessing = /** @class */ (function () {
    function FieldAccessing() {
    }
    return FieldAccessing;
}());
exports.FieldAccessing = FieldAccessing;
var ResponseModel = /** @class */ (function () {
    function ResponseModel() {
    }
    return ResponseModel;
}());
exports.ResponseModel = ResponseModel;
var BaseServiceModel = /** @class */ (function () {
    function BaseServiceModel() {
    }
    return BaseServiceModel;
}());
exports.BaseServiceModel = BaseServiceModel;
var BaseServiceModel2 = /** @class */ (function () {
    function BaseServiceModel2() {
    }
    return BaseServiceModel2;
}());
exports.BaseServiceModel2 = BaseServiceModel2;
var RelatedKeyModel = /** @class */ (function () {
    function RelatedKeyModel() {
    }
    return RelatedKeyModel;
}());
exports.RelatedKeyModel = RelatedKeyModel;
var RefTypeModel = /** @class */ (function () {
    function RefTypeModel() {
    }
    return RefTypeModel;
}());
exports.RefTypeModel = RefTypeModel;
var DocConVerifyTypeModel = /** @class */ (function () {
    function DocConVerifyTypeModel() {
    }
    return DocConVerifyTypeModel;
}());
exports.DocConVerifyTypeModel = DocConVerifyTypeModel;
var KisDropdownOnFocusModel = /** @class */ (function () {
    function KisDropdownOnFocusModel() {
    }
    return KisDropdownOnFocusModel;
}());
exports.KisDropdownOnFocusModel = KisDropdownOnFocusModel;
