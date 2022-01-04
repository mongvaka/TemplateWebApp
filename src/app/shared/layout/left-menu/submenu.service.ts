import { UserDataService } from 'app/core/services/user-data.service';
import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ACCOUNT_TYPE } from 'app/shared/constants';
@Injectable({
  providedIn: 'root',
})
export class SubMenuService {
  renderer: Renderer2;
  1: any; // 1 === submenu HRM
  2: any; // 2 === submenu inventor
  3: any; // 3 === submenu Logistic
  4: any; // 4 === submenu PURCHASE
  5: any; // 5 === submenu CRM
  6: any; // 6 === submenu MRP
  7: any; // 7 === submenu MANTRNANCE
  8: any; // 8 === submenu BUGETING
  9: any; // 9 === submenu ACCOUNT
  10: any; // 10 === submenu ADMINISTRATOR
  11: any; // 11 === submenu SETUP

  constructor(
    private router: Router,
    private translate: TranslateService,
    private rendererFactory: RendererFactory2,
    private userDataService: UserDataService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.translate.get('LABEL').subscribe((text) => {
      this.titlesubMenu(text);
    });
  }
  titlesubMenu(LABEL: any): any {
    //#region HRM
    this[1] = this.getHrmMenu();

    //#endregion
    //#region inventory
    this[2] = this.getInventoryMenu();
    //#endregion
    //#region Logistic
    this[3] = this.getLogisticMenu();
    //#endregion
    //#region  PURCHASE
    this[4] = this.getPurchaseMennu();
    //#endregion
    //#region CRM
    this[5] = this.getCrmMenu();
    //#endregion
    //#region MRP
    this[6] = this.getMrpMenu();
    //#endregion
    //#region MANTRNANCE
    this[7] = this.getMantranceMenu();
    //#endregion
    //#region BUGETING
    this[8] = this.getBudgeting();
    //#endregion
    //#region ACCOUNT
    this[9] = this.getAccountMenu();

    //#endregion
    //#region ADMINISTRATOR
    this[10] = this.getAdminMenu();
    //#endregion
    //#region SETUP
    this[11] = this.getSetupMenu();
    //#endregion
    this.setMenuVisibilty();
  }
  setMenuVisibilty(): void {
    const relatedBtn = document.querySelectorAll('.cust-btn-menu');

    relatedBtn.forEach((body: HTMLInputElement) => {
      if (!this.userDataService.checkCanAccessByLabelTranslate(body.id)) {
        this.renderer.addClass(body, 'disabled');
      }

      // this.renderer.addClass(body, 'disabled');
    });
    // if (
    //   !isNullOrUndefined(relatedBtn) &&
    //   !isNullOrUndefined(relatedBtn.nextSibling)
    // ) {
    //   switchClass(
    //     relatedBtn.nextSibling,
    //     'disabled',
    //     isNullOrUndefined(this.infoItems) || this.infoItems.length === 0
    //   );
    // }
    // if (
    //   !isNullOrUndefined(functionBtn) &&
    //   !isNullOrUndefined(functionBtn.nextSibling)
    // ) {
    //   switchClass(
    //     functionBtn.nextSibling,
    //     'disabled',
    //     isNullOrUndefined(this.actionItems) || this.actionItems.length === 0
    //   );
    // }
    // if (
    //   !isNullOrUndefined(groupBtn) &&
    //   !isNullOrUndefined(groupBtn.nextSibling)
    // ) {
    //   switchClass(
    //     groupBtn.nextSibling,
    //     'disabled',
    //     isNullOrUndefined(this.itemsGroup) || isNullOrUndefined(this.itemsGroup)
    //   );
    // }
  }
  getHrmMenu(): any {
    const menuList = [
      {
        title: 'LABEL.HRM',
      },
      {
        label: 'LABEL.DASHBORAD',
        items: [
          {
            label: 'LABEL.DASHBOARD_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/dashboard/todolist-hr');
            },
          },
          {
            label: 'LABEL.DASHBOARD_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/dashboard/todolist-lead');
            },
          },
          {
            label: 'LABEL.DASHBOARD_EMP',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/dashboard/todolist-emp');
            },
          },
        ],
      },
      {
        label: 'LABEL.REGISTER_STATION',
        items: [
          {
            label: 'LABEL.REGISTER_STATION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/registerstaion');
            },
          },
        ],
      },
      {
        label: 'LABEL.EMPLOYEE',
        items: [
          {
            label: 'LABEL.EMPLOYEE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/employeetable');
            },
          },
          {
            label: 'LABEL.RESIGN_STATUS_EMPLOYEE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/resignstatusemployee');
            },
          },
          // {
          //   label: 'LABEL.WELFARE',
          //   icon: 'fas fa-folder-open',
          //   command: () => {
          //     this.router.navigateByUrl('hrm/employee/welfare');
          //   },
          // },
          {
            label: 'LABEL.TIMETICKET',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/timeticket');
            },
          },
          {
            label: 'LABEL.LEAVE_TRANS_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/leavetrans-hr');
            },
          },
          {
            label: 'LABEL.LEAVE_TRANS_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/leavetrans-lead');
            },
          },
          // {
          //   label: 'LABEL.REQUEST_CERTIFICATE',
          //   icon: 'fas fa-folder-open',
          //   command: () => {
          //     this.router.navigateByUrl('hrm/employee/requestcertificate');
          //   },
          // },
          // {
          //   label: 'LABEL.ADMONITION',
          //   icon: 'fas fa-folder-open',
          //   command: () => {
          //     this.router.navigateByUrl('hrm/employee/admonition');
          //   },
          // },
          // {
          //   label: 'LABEL.PAY_ROLE',
          //   icon: 'fas fa-folder-open',
          //   command: () => {
          //     this.router.navigateByUrl('hrm/employee/payrole');
          //   },
          // },
          {
            label: 'LABEL.RESIGN_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/resignhr');
            },
          },
          {
            label: 'LABEL.RESIGN_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/resignlead');
            },
          },
          {
            label: 'LABEL.BACK_TO_WORK',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/backtowork');
            },
          },

          {
            label: 'LABEL.REQUEST_ADJUST_POSITION_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/positiontrans-lead');
            },
          },
          {
            label: 'LABEL.REQUEST_ADJUST_POSITION_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/positiontrans-hr');
            },
          },
          {
            label: 'LABEL.REQUEST_ADJUST_PROBATION_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/probationtrans-lead');
            },
          },
          {
            label: 'LABEL.REQUEST_ADJUST_PROBATION_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/probationtrans-hr');
            },
          },

          {
            label: 'LABEL.REQUEST_ADJUST_SALARY_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/salarytrans-lead');
            },
          },
          {
            label: 'LABEL.REQUEST_ADJUST_SALARY_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/salarytrans-hr');
            },
          },
          {
            label: 'LABEL.REQUEST_OVERTIME_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/overtime-lead');
            },
          },
          {
            label: 'LABEL.REQUEST_OVERTIME_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/overtime-hr');
            },
          },

          {
            label: 'LABEL.REQUEST_TRANSFER_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/transfer-lead');
            },
          },
          {
            label: 'LABEL.REQUEST_TRANSFER_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/transfer-hr');
            },
          },

          {
            label: 'LABEL.REQUEST_REVISION_TIME_LEAD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl(
                'hrm/employee/requestrevisiontime-lead'
              );
            },
          },
          {
            label: 'LABEL.REQUEST_REVISION_TIME_HR',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/employee/requestrevisiontime-hr');
            },
          },
        ],
      },

      {
        label: 'LABEL.REPORT',
        items: [
          {
            label: 'LABEL.ORGANIZATION_CHART',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/organizationchartr');
            },
          },
          {
            label: 'LABEL.JOB_DESCRIPTION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/jobdescription');
            },
          },
          {
            label: 'LABEL.POSITION_REQUISITION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/positionrequisition');
            },
          },
          {
            label: 'LABEL.EMPLOYEE_CONTRACTS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/employeecontracts');
            },
          },
          {
            label: 'LABEL.TRIAL_EVALUATION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/trialevaluation');
            },
          },
          {
            label: 'LABEL.ANNUAL_PROFORMANCE_ASSESSMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl(
                'hrm/report/annualperformanceassessment'
              );
            },
          },
          {
            label: 'LABEL.QUATERLY_PROFORMANCE_ASSESSMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl(
                'hrm/report/quarterlyperformanceassessment'
              );
            },
          },
          {
            label: 'LABEL.ANNUAL_TRAINING_PLAN',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/annualtrainingplan');
            },
          },
          {
            label: 'LABEL.LIST_OF_TRAINED_PARTICIPANTS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/listoftrainedparticipants');
            },
          },
          {
            label: 'LABEL.INTERNAL_TRAINING_SUMMARY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/internaltrainingsummary');
            },
          },
          {
            label: 'LABEL.EXTERNAL_TRAINING',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/externaltraining');
            },
          },
          {
            label: 'LABEL.TRIANING_HISTORY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/traininghistory');
            },
          },
          {
            label: 'LABEL.EVALUATE_TEACHING_TRAINING',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/evaluateteachingtraining');
            },
          },
          {
            label: 'LABEL.LEGAL_PUNISHMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/legalpunishment');
            },
          },
          {
            label: 'LABEL.LETTER_OF_CONSENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/letterofconsent');
            },
          },
          {
            label: 'LABEL.LETTER_OF_CONSENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/letterofconsent');
            },
          },
          {
            label: 'LABEL.WORK_OUTSIDE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/workoutside');
            },
          },
          {
            label: 'LABEL.ALOOWANCE_REGULATIONS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/allowanceregulations');
            },
          },
          {
            label: 'LABEL.CERTIFICATE_TRANS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/report/certificatetrans');
            },
          },
        ],
      },
      {
        label: 'LABEL.FORM',
        items: [
          {
            label: 'LABEL.APPLICATION_FOR_EMPLOYEEMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/applicationforemployment');
            },
          },
          {
            label: 'LABEL.TRAINING_NEED',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/trainingneed');
            },
          },
          {
            label: 'LABEL.INTERNAL_TRAINING_ASSESSMENT_CRETIFICATE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl(
                'hrm/form/internaltrainingassessmentcertificate'
              );
            },
          },
          {
            label: 'LABEL.URGENT_TRAINING_REQUEST',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/urgenttrainingrequest');
            },
          },
          {
            label: 'LABEL.REQUEST_OVERTIME_APPROVAL',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/requestovertimeapproval');
            },
          },
          {
            label: 'LABEL.RESIGNATION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/resignation');
            },
          },
          {
            label: 'LABEL.MOUNTHLY_LEAVE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/monthlyleave');
            },
          },
          {
            label: 'LABEL.DAILY_LEAVE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/dailyleave');
            },
          },
          {
            label: 'LABEL.SALARY_ADJUSTMENT_REQUEST',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/salaryadjustmentrequest');
            },
          },
          {
            label: 'LABEL.TRANSFER_FROM_UNDER_THE_ORGANIZATION_UNIT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl(
                'hrm/form/transferformundertheorganizationunit'
              );
            },
          },
          // {
          //   label: LABEL.BACK_TO_WORK,
          //   icon: 'fas fa-folder-open',
          //   command: () => {
          //     this.router.navigateByUrl('hrm/from/backtowork');
          //   },
          // },
          {
            label: 'LABEL.BACKWARD_TIMER',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('hrm/form/backwardtimer');
            },
          },
        ],
      },
    ];
    return this.translateMenu(menuList);
  }
  getInventoryMenu(): any {
    const menuList = [
      {
        title: 'LABEL.INVENTORY',
        label: 'LABEL.JOB',
        icon: 'fas fa-folder-open',
        command: () => {
          this.router.navigateByUrl('inventory/job');
        },
      },
      // {
      // label: 'LABEL.STOCK',
      //   items: [
      //     {
      //       label: 'LABEL.STOCKCUT',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('inventory/stockcut');
      //       },
      //     },
      //     {
      //       label: 'LABEL.STOCKIN',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('inventory/stockin');
      //       },
      //     },
      //     {
      //       label: 'LABEL.STOCKOUT',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('inventory/stockout');
      //       },
      //     },
      //   ],
      // },
      {
        label: 'LABEL.STOCKCUT',
        icon: 'fas fa-folder-open',
        command: () => {
          this.router.navigateByUrl('inventory/stockcut');
        },
      },
      {
        label: 'LABEL.STOCKIN',
        icon: 'fas fa-folder-open',
        command: () => {
          this.router.navigateByUrl('inventory/stockin');
        },
      },
      {
        label: 'LABEL.STOCKOUT',
        icon: 'fas fa-folder-open',
        command: () => {
          this.router.navigateByUrl('inventory/stockout');
        },
      },
      {
        label: 'LABEL.STOCKRETURN',
        icon: 'fas fa-folder-open',
        command: () => {
          this.router.navigateByUrl('inventory/stockreturn');
        },
      },
    ];
    return this.translateMenu(menuList);
  }

  getLogisticMenu(): any {
    const menuList = [
      {
        title: 'LABEL.LOGISTIC',
        label: 'LABEL.CAR',
        icon: 'fas fa-folder-open',
        command: () => {
          this.router.navigateByUrl('logistic/car');
        },
      },
    ];
    return this.translateMenu(menuList);
  }
  // getLogisticMenu(): any {
  //   let menuList = [
  //     {
  //       title: 'LABEL.LOGISTIC',
  //       label: 'LABEL.CAR',
  //       icon: 'fas fa-folder-open',
  //       command: () => {
  //         this.router.navigateByUrl('logistic/car');
  //       },
  //     },
  //   ];
  //   return this.translateMenu(menuList);
  // }
  getPurchaseMennu(): any {
    let menuList = [
      {
        label: 'LABEL.PURCHASE',
        title: 'LABEL.PURCHASE',
      },
    ];
    return this.translateMenu(menuList);
  }
  getCrmMenu(): any {
    let menuList = [
      {
        label: 'LABEL.CRM',
        title: 'LABEL.CRM',
      },
    ];
    return this.translateMenu(menuList);
  }
  getMrpMenu(): any {
    let menuList = [
      {
        label: 'LABEL.MRP',
        title: 'LABEL.MRP',
      },
    ];
    return this.translateMenu(menuList);
  }
  getMantranceMenu(): any {
    let menuList = [
      {
        label: 'LABEL.MAINTENANCE',
        title: 'LABEL.MAINTENANCE',
      },
    ];
    return this.translateMenu(menuList);
  }
  getBudgeting(): any {
    let menuList = [
      {
        label: 'LABEL.BUGETING',
        title: 'LABEL.BUGETING',
      },
    ];
    return this.translateMenu(menuList);
  }
  getAccountMenu(): any {
    let menuList = [
      {
        title: 'LABEL.ACCOUNT',
        label: 'LABEL.BOOK_BANK',
        command: () => {
          this.router.navigateByUrl('account/book_bank');
        },
      },
    ];
    return this.translateMenu(menuList);
  }
  getAdminMenu(): any {
    let menuList = [
      {
        title: 'LABEL.ADMINISTRATOR',
        label: 'LABEL.USERS',
        command: () => {
          this.router.navigateByUrl('administrator/user');
        },
      },
      {
        label: 'LABEL.ROLES',
        command: () => {
          this.router.navigateByUrl('administrator/role');
        },
      },
      {
        label: 'LABEL.SUBSCRIBE',
        command: () => {
          this.router.navigateByUrl('administrator/subscribe');
        },
      },
      {
        label: 'LABEL.ACCESSRIGHT',

        command: () => {
          this.router.navigateByUrl('administrator/assessright');
        },
      },
    ];
    return this.translateMenu(menuList);
  }
  getSetupMenu(): any {
    const menuList = [
      {
        title: 'LABEL.SETUP',
        label: 'LABEL.ORGANIZATION',
        items: [
          {
            label: 'LABEL.COMPANY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/organization/company');
            },
          },
          {
            label: 'LABEL.COMPANY_CATEGORY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/organization/companycategory');
            },
          },
          {
            label: 'LABEL.BRANCH',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/organization/branch');
            },
          },
          {
            label: 'LABEL.DEPARTMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/organization/department');
            },
          },
          {
            label: 'LABEL.POSITION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/organization/position');
            },
          },
          {
            label: 'LABEL.TAX',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/organization/tax');
            },
          },
        ],
      },
      {
        label: 'LABEL.BOOKMARKDOCUMENT_TEMPLATE',
        items: [
          {
            label: 'LABEL.BOOKMARKDOCUMENT_TEMPLATE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl(
                'setup/bookmarkdocumenttemplate/bookmarkdocumenttemplate'
              );
            },
          },
        ],
      },
      {
        label: 'LABEL.HRM',
        items: [
          {
            label: 'LABEL.WORK_TIME_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/worktimetype');
            },
          },
          {
            label: 'LABEL.DAY_OFF_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/dayofftype');
            },
          },
          {
            label: 'LABEL.WELFARE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/welfare');
            },
          },
          {
            label: 'LABEL.TRAINING',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/training');
            },
          },
          {
            label: 'LABEL.ASSESSMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/assessmenttrans');
            },
          },
          {
            label: 'LABEL.ASSESSMENT_TRANS_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/assessmenttranstype');
            },
          },
          {
            label: 'LABEL.EMPLOYEE_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/employeetype');
            },
          },
          {
            label: 'LABEL.JOB_LEVEL',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/joblevel');
            },
          },
          {
            label: 'LABEL.JOB_TRANS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/jobtrans');
            },
          },
          {
            label: 'LABEL.LEAVE_TRANS_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/leavetranstype');
            },
          },
          {
            label: 'LABEL.SALARY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/salary');
            },
          },
          {
            label: 'LABEL.NATIONALITY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/nationality');
            },
          },
          {
            label: 'LABEL.CERTIFICATE_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/certificatetype');
            },
          },

          {
            label: 'LABEL.LEGAL_PUNISHMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/hrm/legalpunishment');
            },
          },
        ],
      },
      {
        label: 'LABEL.ACCOUNTING',
        items: [
          {
            label: 'LABEL.LEDGER_DIMENSION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/accounting/ledgerdimension');
            },
          },
          {
            label: 'LABEL.LEDGER_PERIOD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/accounting/ledgerperiod');
            },
          },
          {
            label: 'LABEL.GENERAL_LEDGER',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/accounting/generalledger');
            },
          },
        ],
      },
      // {
      //   label: 'LABEL.ADDRESS',
      //   items: [
      //     {
      //       label: 'LABEL.COUNTRY',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('setup/address/country');
      //       },
      //     },
      //     {
      //       label: 'LABEL.PROVINCE',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('setup/address/province');
      //       },
      //     },
      //     {
      //       label: 'LABEL.DISTRICT',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('setup/address/district');
      //       },
      //     },
      //     {
      //       label: 'LABEL.SUB_DISTRICT',
      //       icon: 'fas fa-folder-open',
      //       command: () => {
      //         this.router.navigateByUrl('setup/address/subdistrict');
      //       },
      //     },
      //   ],
      // },
      {
        label: 'LABEL.CONTACT',
        items: [
          {
            label: 'LABEL.CONTACT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/contact/contacttable');
            },
          },
        ],
      },

      {
        label: 'LABEL.BUDGETING',
        items: [
          {
            label: 'LABEL.BUDGETING_CODE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/budgeting/budgetingcode');
            },
          },
          {
            label: 'LABEL.BUDGETING_GROUP',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/budgeting/budgetinggroup');
            },
          },
        ],
      },
      {
        label: 'LABEL.BANK',
        items: [
          {
            label: 'LABEL.BANK',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/bank/bank');
            },
          },
          {
            label: 'LABEL.BANK_GROUP',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/bank/bankgroup');
            },
          },
        ],
      },
      {
        label: 'LABEL.CUSTOMER',
        items: [
          {
            label: 'LABEL.CUSTOMER',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/customer/customers');
            },
          },
          {
            label: 'LABEL.CUSTOMER_CATEGORY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/customer/customercategory');
            },
          },
          {
            label: 'LABEL.CONTACT_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/customer/contacttype');
            },
          },
          {
            label: 'LABEL.CUSTOMER_GROUP',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/customer/customergroup');
            },
          },
        ],
      },
      {
        label: 'LABEL.SUPPLIER',
        items: [
          {
            label: 'LABEL.SUPPLIER',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/supplier/supplier');
            },
          },
          {
            label: 'LABEL.SUPPLIER_CATEGORY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/supplier/suppliercatgory');
            },
          },
          {
            label: 'LABEL.SUPPLIER_BRANCH',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/supplier/supplierbranch');
            },
          },
        ],
      },
      {
        label: 'LABEL.INVENTORY',
        items: [
          {
            label: 'LABEL.ITEM_CATEGORY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/item-category');
            },
          },
          {
            label: 'LABEL.ITEM',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/item');
            },
          },
          {
            label: 'LABEL.INVENTORYTRANSECTION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/inventorytransection');
            },
          },
          {
            label: 'LABEL.PART',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/part');
            },
          },
          {
            label: 'LABEL.WHAREHOUSE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/warehouse');
            },
          },
          {
            label: 'LABEL.INVENTORY_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/inventorytype');
            },
          },
          {
            label: 'LABEL.SPARE_PARTS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/sparepart');
            },
          },
          {
            label: 'LABEL.UNIT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/inventory/unit');
            },
          },
        ],
      },
      {
        label: 'LABEL.ASSET',
        items: [
          {
            label: 'LABEL.ASSET',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/asset/asset');
            },
          },
          {
            label: 'LABEL.ASSET_CATEGORY',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/asset/assetcategory');
            },
          },
          {
            label: 'LABEL.VEHICLE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/asset/vehicle');
            },
          },
          {
            label: 'LABEL.MECHICLE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/asset/mechicle');
            },
          },
        ],
      },
      {
        label: 'LABEL.PRODUCT',
        items: [
          {
            label: 'LABEL.PRODUCT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/product/producttable');
            },
          },
          {
            label: 'LABEL.PRODUCT_GROUP',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/product/productgroup');
            },
          },
          {
            label: 'LABEL.BRAND',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/product/brand');
            },
          },
        ],
      },
      {
        label: 'LABEL.MRP',
        items: [
          {
            label: 'LABEL.JOB',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/mrp/job');
            },
          },
          {
            label: 'LABEL.BOM',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/mrp/bom');
            },
          },
        ],
      },
      {
        label: 'LABEL.MANTENANCE',
        items: [
          {
            label: 'LABEL.RM',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/mantenance/rm');
            },
          },
        ],
      },
      {
        label: 'LABEL.LOGISTICS',
        items: [
          {
            label: 'LABEL.ROUTE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/logistics/route');
            },
          },
          {
            label: 'LABEL.LOCATION',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/logistics/location');
            },
          },
        ],
      },
      {
        label: 'LABEL.PURCHASE',
        items: [
          {
            label: 'LABEL.PURCHASING_METHOD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/purchase/purchasingmethod');
            },
          },
        ],
      },
      {
        label: 'LABEL.RECIEVE',
        items: [
          {
            label: 'LABEL.RECIEVE_METHOD',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/recieve/recievemethod');
            },
          },
        ],
      },
      {
        label: 'LABEL.DOCUMENT',
        items: [
          {
            label: 'LABEL.DOCUMENT_NUMBER',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/document/documentnumber');
            },
          },
          {
            label: 'LABEL.DOCUMENT_TEMPLATE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/document/documenttemplate');
            },
          },
          {
            label: 'LABEL.DOCUMENT_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/document/documenttype');
            },
          },
          {
            label: 'LABEL.DOCUMENT_STATUS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/document/documentstatus');
            },
          },
          {
            label: 'LABEL.ATTACHMENT',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/document/attachment');
            },
          },
        ],
      },
      {
        label: 'LABEL.TRANSACTION',
        items: [
          {
            label: 'LABEL.TRAINING_TRANS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/trainigtrans');
            },
          },
          {
            label: 'LABEL.TRAINING_TRANS_DETAIL',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/trainigtransdetail');
            },
          },
          {
            label: 'LABEL.LEAVE_TRANS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/leavetrans');
            },
          },
          {
            label: 'LABEL.LEAVE_TRANS_TYPE',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/leavetranstype');
            },
          },
          {
            label: 'LABEL.CONTACT_PERSON',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/contactperson');
            },
          },
          {
            label: 'LABEL.POSITION_TRANS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/position');
            },
          },
          {
            label: 'LABEL.WARNING_TRANS',
            icon: 'fas fa-folder-open',
            command: () => {
              this.router.navigateByUrl('setup/transaction/warningtrans');
            },
          },
        ],
      },
    ];
    return this.translateMenu(menuList);
  }
  translateMenu(menuList: any): any {
    let masterMenu = this.getAcessMenu(menuList);
    masterMenu.forEach((item) => {
      item.label = this.translate.instant(item.label);
      if (item.items) {
        item.items.forEach((subItem) => {
          subItem.label = this.translate.instant(subItem.label);
        });
      }
    });
    return masterMenu;
  }
  getAcessMenu(menuList: any): any {
    let visitibleMenu = [];
    menuList.forEach((item) => {
      if (item.items) {
        let itemList = [];
        item.items.forEach((subItem) => {
          if (this.userDataService.checkCanAccessByLabel(subItem.label)) {
            itemList.push(subItem);
          }
        });
        item.items = itemList;
      }
      if (this.userDataService.checkCanAccessByLabel(item.label)) {
        visitibleMenu.push(item);
      }
    });
    return visitibleMenu;
  }
}
