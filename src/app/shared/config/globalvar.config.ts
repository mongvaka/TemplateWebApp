import { AppInjector } from '../../app-injector';
import { ConfigurationService } from '../../core/services/configurtion.service';
import {
  Environment,
  IColumnWidth,
  IFileName,
  InterfaceWithSystems,
  DeploymentConfig,
  ToastTimeout,
  ActionHistoryStartflowOption,
} from '../../shared/models/system_model';
import { environment } from '../../../environments/environment';

let dateFormat: string;
let inputDateTimeFormat: string;
let inputDateFormat: string;

let acceptedFileFormat: string;
let fileSizeLimit: number;
let _environment: Environment;

let encryptionKey: string;
let systemLogLevel: string;

let interfaces: InterfaceWithSystems;

let deploymentConfig: DeploymentConfig;

let columnsWidth: IColumnWidth;
let excelfileNameFormat: IFileName;
let toastTimeout: ToastTimeout;
let actionHistoryStartflowOption: ActionHistoryStartflowOption;

export function setAppSetting(): void {
  const configuration = AppInjector.get(ConfigurationService);
  _environment = configuration.config.environments.find(
    (f) => f.production === environment.production
  );
  dateFormat = configuration.config.dateFormat;
  inputDateTimeFormat = configuration.config.inputDateTimeFormat;
  inputDateFormat = configuration.config.inputDateFormat;
  acceptedFileFormat = configuration.config.acceptedFileFormat;
  fileSizeLimit = configuration.config.fileSizeLimit;
  encryptionKey = configuration.config.encryptionKey;
  systemLogLevel = configuration.config.systemLogLevel;
  interfaces = configuration.config.interfaces;
  deploymentConfig = configuration.config.deploymentConfig;
  columnsWidth = configuration.config.columnsWidth;
  excelfileNameFormat = configuration.config.excelfileNameFormat;
  toastTimeout = configuration.config.toastTimeout;
  actionHistoryStartflowOption =
    configuration.config.actionHistoryStartflowOption;
}
export function getInputDateTimeFormat(): string {
  return inputDateTimeFormat;
}
export function getInputDateFormat(): string {
  return inputDateFormat;
}

export function getAcceptedFileFormat(): string {
  return acceptedFileFormat;
}

export function getFileSizeLimit(): number {
  return fileSizeLimit;
}

export function getEnvironment(): Environment {
  return _environment;
}
export function getEncryptionKey(): string {
  return encryptionKey;
}

export function getSystemLogLevel(): string {
  return systemLogLevel;
}

export function isInterfacedWithAX(): boolean {
  return interfaces.MicrosoftAX;
}

export function getColumnsWidth(): IColumnWidth {
  return columnsWidth;
}
export function getExcelfileNameFormat(): IFileName {
  return excelfileNameFormat;
}
export function getToastErrorTimeout(): number {
  if (toastTimeout && toastTimeout.error && toastTimeout.error > 0) {
    return toastTimeout.error;
  } else {
    return new ToastTimeout().error;
  }
}
export function getToastSuccessTimeout(): number {
  if (toastTimeout && toastTimeout.success && toastTimeout.success > 0) {
    return toastTimeout.success;
  } else {
    return new ToastTimeout().success;
  }
}
export function getToastWarningTimeout(): number {
  if (toastTimeout && toastTimeout.warning && toastTimeout.warning > 0) {
    return toastTimeout.warning;
  } else {
    return new ToastTimeout().warning;
  }
}
export function getToastInfoTimeout(): number {
  if (toastTimeout && toastTimeout.info && toastTimeout.info > 0) {
    return toastTimeout.info;
  } else {
    return new ToastTimeout().info;
  }
}
