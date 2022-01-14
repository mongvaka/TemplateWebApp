import { Injectable } from '@angular/core';
import { MessageService, Confirmation, Message } from 'primeng/api';
import { MessageModel, TranslateModel } from '../../shared/models/system_model';
import { Subject } from 'rxjs/internal/Subject';
import {
  getTranslateMessage,
  getTranslateMessages,
  getErrorToTranslate,
  getErrorToTopic,
  isNullOrUndefined,
} from '../../shared/functions/value.function';
//import { LoggingService } from './logging.service';
import { AppInjector } from '../../app-injector';
import { TranslateService } from '@ngx-translate/core';
import {
  IConfirmation,
  ErrorResponse,
  LoggingModel,
} from '../../shared/models/system_model';
import {
  getSystemLogLevel,
  getToastSuccessTimeout,
  getToastInfoTimeout,
  getToastWarningTimeout,
  getToastErrorTimeout,
} from '../../shared/config/globalvar.config';
import { UserDataService } from './user-data.service';
import { AppConst, NOTI_TYPE } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public showNotificationMsgsSubject = new Subject<boolean>();
  public showBranchCompanySelectorSubject = new Subject<boolean>();
  public showUnauthorizedSubject = new Subject<boolean>();
  public confirmModalSubject = new Subject<MessageModel>();
  public confirmDialogSubject = new Subject<Confirmation>();
  public isAccept = new Subject<boolean>();
  public isAcceptWithKey = new Subject<IConfirmation>();
  public translate = AppInjector.get(TranslateService);
  constructor(
    private messageService: MessageService,
    //private loggingService: LoggingService,
    private userDataService: UserDataService
  ) {}

  showSuccess(message: MessageModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const msg: Message = {
      severity: 'success',
      summary: getTranslateMessage(message.topic),
      detail: getTranslateMessage(message.content),
      life: getToastSuccessTimeout() * 1000, // seconds
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }

  showInfo(message: MessageModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const msg: Message = {
      severity: 'info',
      summary: getTranslateMessage(message.topic),
      detail: getTranslateMessage(message.content),
      life: getToastInfoTimeout() * 1000, // seconds
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }

  showWarn(message: MessageModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const msg: Message = {
      severity: 'warn',
      summary: getTranslateMessage(message.topic),
      detail: getTranslateMessage(message.content),
      life: getToastWarningTimeout() * 1000, // seconds
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }

  showError(message: MessageModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const msg: Message = {
      severity: 'error',
      summary: getTranslateMessage(message.topic),
      detail: getTranslateMessage(message.content),
      life: getToastErrorTimeout() * 1000, // seconds
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showErrorMessageFromResponse(error: ErrorResponse): void {
    this.showMultipleToastError({
      topic: getErrorToTopic(error),
      contents: getErrorToTranslate(error),
    });
  }
  showErrorMessageFromManual(
    topic: TranslateModel,
    contents: TranslateModel[],
    severity = 'error'
  ): void {
    this.showMultipleToastError(
      {
        topic: topic,
        contents: contents,
      },
      severity
    );
  }
  showWarningMessageFromManual(
    topic: TranslateModel,
    contents: TranslateModel[],
    severity = 'warn'
  ): void {
    this.showMultipleToastError(
      {
        topic: topic,
        contents: contents,
      },
      severity
    );
  }
  showMultipleToastError(message: MessageModel, severity = 'error'): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const toastTimeout = getToastErrorTimeout();
    const translatedTopic: string = getTranslateMessage(message.topic);
    const translatedMsgs: string[] = getTranslateMessages(message.contents);

    if (translatedMsgs.length !== 0) {
      for (let i = 0; i < translatedMsgs.length; i++) {
        let msg: Message = {
          severity: severity,
          summary: translatedTopic,
          detail: translatedMsgs[i],
        };
        //this.loggingService.createNormalAppLog(msg, title.textContent);
        msg.life = toastTimeout * 1000; // seconds
        this.messageService.add(msg);
      }
    } else {
      const msg: Message = {
        severity: 'error',
        summary: translatedTopic,
        detail: '',
      };
      //this.loggingService.createNormalAppLog(msg, title.textContent);
      msg.life = toastTimeout * 1000; // seconds
      this.messageService.add(msg);
    }
  }
  showMultipleToastCustomError(
    message: MessageModel,
    severity = 'error'
  ): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const toastTimeout = getToastErrorTimeout();
    const translatedTopic: string = message.topic.toString();

    const msg: Message = {
      severity: 'error',
      summary: translatedTopic,
      detail: '',
    };
    //this.loggingService.createNormalAppLog(msg, title.textContent);
    msg.life = toastTimeout * 1000; // seconds
    this.messageService.add(msg);
  }
  showMultiple(message: MessageModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const topic: string = getTranslateMessage(message.topic);
    const msgs: string[] = getTranslateMessages(message.contents);
    const msg: Message = {
      key: 'error',
      sticky: true,
      severity: 'warn',
      summary: topic,
      data: msgs,
    };
    this.messageService.clear();
    this.messageService.add(msg);

    //this.loggingService.createNormalAppLog(msg, title.textContent, msg.data);
  }
  showInfoMultiple(message: MessageModel, isTrans = true): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    let msg: Message;
    if (isTrans) {
      msg = {
        key: 'error',
        sticky: true,
        severity: 'info',
        summary: getTranslateMessage(message.topic),
        data: getTranslateMessages(message.contents),
      };
    } else {
      const contents: string[] = [];
      message.contents.forEach((cont) => {
        contents.push(cont.code);
      });
      msg = {
        key: 'error',
        sticky: true,
        severity: 'info',
        summary: message.topic.code,
        data: contents,
      };
    }

    this.messageService.clear();
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent, msg.data);
  }
  showSuccessMultiple(message: MessageModel, isTrans = true): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const toastTimeout = getToastSuccessTimeout();
    const translatedTopic: string = getTranslateMessage(message.topic);
    const translatedMsgs: string[] = getTranslateMessages(message.contents);
    if (translatedMsgs.length !== 0) {
      for (let i = 0; i < translatedMsgs.length; i++) {
        const msg: Message = {
          severity: 'success',
          summary: translatedTopic,
          detail: translatedMsgs[i],
        };
        //this.loggingService.createNormalAppLog(msg, title.textContent);
        msg.life = toastTimeout * 1000; // 3 seconds
        this.messageService.add(msg);
      }
    } else {
      const msg: Message = {
        severity: 'success',
        summary: translatedTopic,
        detail: '',
      };

      //this.loggingService.createNormalAppLog(msg, title.textContent);
      msg.life = toastTimeout * 1000; // 3 seconds
      this.messageService.add(msg);
    }
  }
  showConfirmModal(message: MessageModel): void {
    this.confirmModalSubject.next(message);
  }
  showConfirmDialog(confirmation: Confirmation): void {
    this.confirmDialogSubject.next(confirmation);
  }
  showSearchingSuccess(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'success',
      summary: 'Success',
      detail: 'Searching Succeeded',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showSearchingError(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'error',
      summary: 'Success',
      detail: 'Searching Failed',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showGetSuccess(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'success',
      summary: 'Success',
      detail: 'GetData Succeeded',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showGetError(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'error',
      summary: 'Fail',
      detail: 'GetData Failed',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showSaveSuccess(label?: TranslateModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'success',
      summary: 'Success',
      life: getToastSuccessTimeout() * 1000, // 3 seconds
    };
    if (isNullOrUndefined(label)) {
      msg.detail = 'SaveData Succeeded';
    } else {
      msg.detail = getTranslateMessage(label);
    }

    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showSaveError(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'error',
      summary: 'Fail',
      detail: 'SaveData Failed',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showGetDDLError(name: TranslateModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'error',
      summary: 'Fail',
      detail: `Can not get ${getTranslateMessage(name)}`,
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showDeletedInfo(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    const msg: Message = {
      severity: 'info',
      summary: 'Success',
      detail: 'Deleting Succeeded',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showDeletedSuccess(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'success',
      summary: 'Success',
      detail: 'Deleting Succeeded',
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showDeletedError(): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.ui-panel-title');
    }
    const msg: Message = {
      severity: 'error',
      summary: this.translate.instant('ERROR.ERROR'),
      detail: this.translate.instant('ERROR.00034'),
    };
    this.messageService.add(msg);
    //this.loggingService.createNormalAppLog(msg, title.textContent);
  }
  showDeletionDialogManual(translate: TranslateModel): void {
    const confirmation: Confirmation = {
      message: getTranslateMessage(translate),
      header: this.translate.instant('CONFIRM.DELETE_CONFIRMATION'),
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
    };
    this.confirmDialogSubject.next(confirmation);
  }
  showDeletionDialog(): void {
    const confirmation: Confirmation = {
      message: this.translate.instant('CONFIRM.00020'),
      header: this.translate.instant('CONFIRM.DELETE_CONFIRMATION'),
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
    };
    this.confirmDialogSubject.next(confirmation);
  }
  showDeletionDialogWithKey(key: string): void {
    const confirmation: Confirmation = {
      message: this.translate.instant('CONFIRM.00020'),
      header: this.translate.instant('CONFIRM.DELETE_CONFIRMATION'),
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      key: key,
    };
    this.confirmDialogSubject.next(confirmation);
  }
  showUploadDialog(): void {
    const confirmation: Confirmation = {
      message: this.translate.instant('CONFIRM.00069'),
      header: this.translate.instant('CONFIRM.UPLOAD_CONFIRMATION'),
      icon: 'pi pi-upload',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
    };
    this.confirmDialogSubject.next(confirmation);
  }
  showSaveChangesDialog(): void {
    const confirmation: Confirmation = {
      message: this.translate.instant('CONFIRM.00070'),
      header: this.translate.instant('CONFIRM.SAVE_CHANGES_CONFIRMATION'),
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
    };
    this.confirmDialogSubject.next(confirmation);
  }
  showConfirmRedirect(): void {
    const confirmation: Confirmation = {
      message: this.translate.instant('CONFIRM.00071'),
      header: this.translate.instant('CONFIRM.LEAVE_PAGE'),
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
    };
    this.confirmDialogSubject.next(confirmation);
  }
  showManualConfirmDialog(
    header: TranslateModel,
    message: TranslateModel
  ): void {
    const confirmation: Confirmation = {
      message: getTranslateMessage(message),
      header: getTranslateMessage(header),
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
    };
    this.confirmDialogSubject.next(confirmation);
  }
  clearShow(): void {
    this.messageService.clear();
  }
  showUnauthorized(): void {
    this.showUnauthorizedSubject.next(true);
  }
  showBranchCompanySelector(): void {
    this.showBranchCompanySelectorSubject.next(true);
  }
  hideBranchCompanySelector(): void {
    this.showBranchCompanySelectorSubject.next(false);
  }
  showNotificationMsgs(): void {
    this.showNotificationMsgsSubject.next(true);
  }
  showNotificationFromResponse(message: MessageModel): void {
    let title = document.querySelector('.ui-panel-title');
    if (isNullOrUndefined(title)) {
      title = document.querySelector('.cust-panel-title');
    }
    let toastTimeout = getToastWarningTimeout();
    const topics: TranslateModel[] = [];
    message.contents.forEach((content) => {
      topics.push({
        code:
          content.type === NOTI_TYPE.WARNING
            ? 'ERROR.WARNING'
            : 'LABEL.INFORMATION',
      });
    });
    const translatedTopic: string[] = getTranslateMessages(topics);
    const translatedMsgs: string[] = getTranslateMessages(message.contents);
    if (translatedMsgs.length !== 0) {
      for (let i = 0; i < translatedMsgs.length; i++) {
        toastTimeout =
          message.contents[i].type === NOTI_TYPE.WARNING
            ? getToastWarningTimeout()
            : getToastInfoTimeout();
        const msg: Message = {
          severity: message.contents[i].type,
          summary: translatedTopic[i],
          detail: translatedMsgs[i],
        };
        msg.life = toastTimeout * 1000;
        this.messageService.add(msg);
        //this.loggingService.createNormalAppLog(msg, title.textContent);
      }
    } else {
      const msg: Message = {
        severity: 'error',
        summary: translatedTopic[0],
        detail: '',
      };
      msg.life = toastTimeout * 1000; // seconds
      this.messageService.add(msg);
      //this.loggingService.createNormalAppLog(msg, title.textContent);
    }
  }

  showHttpLogNotification(item: LoggingModel): void {
    const msg: string = item.message;
    const topic: string = item.topic;
    const logLevel: string = getSystemLogLevel(); // Error, All
    const showSysLog: string = this.userDataService.getShowSystemLog();

    if (showSysLog === AppConst.TRUE) {
      if (item.systemLogDetail.isError) {
        if (logLevel === AppConst.ERROR || logLevel === AppConst.ALL) {
          this.messageService.add({
            severity: item.messageType,
            summary: topic,
            detail: msg,
            life: 1000 * 3, // 3 seconds
          });
        }
      } else {
        if (logLevel === AppConst.ALL) {
          this.messageService.add({
            severity: item.messageType,
            summary: topic,
            detail: msg,
            life: 1000 * 3, // 3 seconds
          });
        }
      }
    }
  }
}
