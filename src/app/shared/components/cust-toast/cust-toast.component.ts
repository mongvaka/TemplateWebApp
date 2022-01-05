import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/core/services/notificaton.service';
import { AppConst } from 'app/shared/constants';
import {
  isNullOrUndefOrEmpty,
  isUndefinedOrZeroLength,
} from 'app/shared/functions/value.function';
import { IConfirmation, MessageModel } from 'app/shared/models/system_model';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cust-toast',
  templateUrl: './cust-toast.component.html',
  styleUrls: ['./cust-toast.component.scss'],
})
export class CustToastComponent implements OnInit {
  isUndefinedOrZeroLength = isUndefinedOrZeroLength;
  AppConst = AppConst;
  showUnauthoirzed: boolean = false;
  showBranchCompany: boolean = false;
  visibleCompanyBranchSelector: boolean = false;
  currentCompanyGUID: string;
  loginSite: string;
  message = new MessageModel();
  confirmation: Confirmation;

  toastStyle: string = 'custom-toast';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private notiService: NotificationService
  ) {
    notiService.confirmModalSubject.subscribe((data) => {
      this.message = data;
    });
    notiService.confirmDialogSubject.subscribe((data) => {
      this.confirmation = data;
      this.onConfirmDialog(this.confirmation);
    });
    notiService.showUnauthorizedSubject.subscribe((data) => {
      this.showUnauthoirzed = data;
    });
    notiService.showBranchCompanySelectorSubject.subscribe((data) => {
      if (data) {
        if (!this.visibleCompanyBranchSelector) {
          this.visibleCompanyBranchSelector = true;
        } else {
          this.showBranchCompany = data;
        }
      } else {
        this.showBranchCompany = data;
      }
    });
    // this.userDataService.staticCompanyBranchSelectorLoadedSubject.subscribe((componentReady) => {
    //   if (componentReady && this.visibleCompanyBranchSelector) {
    //     this.showBranchCompany = true;
    //   }
    // });
  }

  addSingle(): any {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  ngOnInit(): void {}
  onConfirm() {
    this.messageService.clear('error');
  }
  onReject() {}
  onConfirmDialog(conf: Confirmation): void {
    this.confirmationService.confirm({
      message: conf.message,
      header: conf.header,
      icon: conf.icon,
      accept: () => {
        if (isNullOrUndefOrEmpty(conf.key)) {
          if (this.notiService.isAccept.observers.length > 1) {
            this.notiService.isAccept.observers.splice(
              0,
              this.notiService.isAccept.observers.length - 1
            );
          }
          this.notiService.isAccept.next(true);
        } else {
          const confirm: IConfirmation = { key: conf.key, isAccept: true };
          this.notiService.isAcceptWithKey.next(confirm);
        }
      },
      reject: () => {
        if (isNullOrUndefOrEmpty(conf.key)) {
          if (this.notiService.isAccept.observers.length > 1) {
            this.notiService.isAccept.observers.splice(
              0,
              this.notiService.isAccept.observers.length - 1
            );
          }
          this.notiService.isAccept.next(false);
        } else {
          const confirm: IConfirmation = { key: conf.key, isAccept: false };
          this.notiService.isAcceptWithKey.next(confirm);
        }
      },
      acceptLabel: conf.acceptLabel,
      rejectLabel: conf.rejectLabel,
    });
  }
  onClose401() {
    this.showUnauthoirzed = false;
  }
  onCloseBranchCompany() {
    this.showBranchCompany = false;
    sessionStorage.removeItem('companyFromResponse');
  }
  onShowBranchCompany() {
    // this.currentCompanyGUID = this.userDataService.getCurrentCompanyGUID();
    // this.loginSite = this.userDataService.getSiteLogin();
  }
}
