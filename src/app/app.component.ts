import { ShowMenuService } from './shared/services/show-menu.service';
import { LoaderService } from './core/services/loader.service';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  Inject,
  Renderer2,
  PLATFORM_ID,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouteConfigLoadStart,
  ActivationStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  calendarListener,
  reCalcFunctionAndRelatedDialogPosition,
  reCalcMutipleSelectionDialogSize,
} from './shared/functions/event.function';
import {
  getEnvironment,
  setAppSetting,
} from './shared/config/globalvar.config';
import { ConfigurationService } from './core/services/configurtion.service';
import { TranslateService } from '@ngx-translate/core';
import { UIControllerService } from './core/services/uiController.service';
import { UserDataService } from './core/services/user-data.service';
import { LocationStrategy } from '@angular/common';
import { AccessRightService } from './core/services/access_right_service';
import { FUNCTION_PATHS, RELETEDINFO_PATHS } from './shared/constants';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public renderer: Renderer2,
    // private menuService: MenuService,
    public translate: TranslateService,
    private uiService: UIControllerService,
    private messageService: MessageService,
    private userDataService: UserDataService,
    private configService: ConfigurationService,
    @Inject(PLATFORM_ID) private platformId: any,
    private locationStrategy: LocationStrategy,
    // private oAuthService: OAuthService,
    // private authService: AuthService,
    private accessService: AccessRightService,
    private router: Router,
    public loaderService: LoaderService,
    public showMenuService: ShowMenuService
  ) {
    this.isShowLog = false;
    setAppSetting();
    // const appLanguage = this.userDataService.getAppLanguage();
    const appLanguage = userDataService.getAppLanguage();
    const defaultLang = this.configService.config.defaultLanguage.toLowerCase();

    translate.setDefaultLang(defaultLang);
    if (appLanguage === undefined || appLanguage === null) {
      translate.use(defaultLang);
    } else {
      translate.use(appLanguage);
    }
  }
  onleftmenu = false;
  isShowLog: boolean;

  url: any = '';

  title = 'app-icefac';
  // footer = false;
  // barMian = false;
  // leftMenuNone = false;
  // topMenuNone = false;

  @HostListener('document:click', ['$event'])
  clickout(event): void {
    reCalcFunctionAndRelatedDialogPosition(event);
    // reCalcMutipleSelectionDialogSize(event);
    // calendarListener(event);
  }
  onlogins(value: any): any {}

  onlogout(value: boolean): any {
    this.showMenuService.isPresentingLeftMenu.next(value);
    this.showMenuService.isPresentingHamberger.next(value);
    // this.topMenuNone = value;
  }
  click(url: any): any {
    if (url === '/login' || url === '/') {
      this.showMenuService.isPresentingLeftMenu.next(true);
      this.showMenuService.isPresentingTopMenu.next(true);
      this.showMenuService.isPresentingFooter.next(true);
      this.showMenuService.isPresentingHamberger.next(true);

      // this.leftMenuNone = true;
      // this.topMenuNone = true;
      // this.footer = true;
      // this.barMian = true;
    } else {
      this.showMenuService.isPresentingLeftMenu.next(false);
      this.showMenuService.isPresentingTopMenu.next(false);
      this.showMenuService.isPresentingFooter.next(false);
      this.showMenuService.isPresentingHamberger.next(false);

      // this.leftMenuNone = false;
      // this.topMenuNone = false;
      // this.footer = false;
      // this.barMian = false;
    }
  }

  open(): any {
    this.onleftmenu === false
      ? (this.onleftmenu = true)
      : (this.onleftmenu = false);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.click(event.url);
      }

      // if (event instanceof RouteConfigLoadStart) {
      //   if (FUNCTION_PATHS.findIndex((f) => f === event.route.path) > -1) {
      //     this.uiService.setIncreaseReqCounter('app router');
      //   }
      //   if (RELETEDINFO_PATHS.findIndex((f) => f === event.route.path) > -1) {
      //     this.uiService.setIncreaseReqCounter('app router');
      //   }
      // } else if (event instanceof RouteConfigLoadEnd) {
      //   if (FUNCTION_PATHS.findIndex((f) => f === event.route.path) > -1) {
      //     if (this.isShowLog) {
      //     }
      //     this.uiService.fullPageSubject.next(true);
      //     this.uiService.setDecreaseReqCounter('app router');
      //   }
      //   if (RELETEDINFO_PATHS.findIndex((f) => f === event.route.path) > -1) {
      //     this.uiService.setDecreaseReqCounter('app router');
      //   }
      // }
      if (event instanceof ActivationStart) {
        this.uiService.setHistSnapshot(event.snapshot);
      }
      if (event instanceof NavigationEnd) {
        this.uiService.setInitialMode(event);
      }
    });
  }
}
