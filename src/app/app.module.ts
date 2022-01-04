import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { SharedModule } from './shared/shared.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfigurationService } from './core/services/configurtion.service';

import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { authenService } from './shared/services/authen.service';
import { HttpErrorHandler } from './shared/services/config/http-error-handler.service';
import { MessagingService } from './shared/services/config/messaging.service';

import { setAppInjector } from './app-injector';
import { UserDataService } from './core/services/user-data.service';
import { BaseComponent } from './core/components/base/base.component';
import { BaseItemComponent } from './core/components/base-item/base-item.component';
import { BaseListComponent } from './core/components/base-list/base-list.component';
import { BaseDropdownComponent } from './core/components/base/base.dropdown.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { ShowMenuService } from './shared/services/show-menu.service';
import { CannotAccess401Component } from './components/cannot-access401/cannot-access401.component';

export function HttpLoaderFactory(http: HttpClient): any {
  return new MultiTranslateHttpLoader(http, [
    { prefix: '../assets/i18n/', suffix: '.json' },
    { prefix: '../assets/i18n/custom/', suffix: '.json' },
  ]);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseItemComponent,
    BaseListComponent,
    BaseComponent,
    CannotAccess401Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    CalendarModule,
    CalendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigurationService) => () =>
        configService.loadConfigurationData(),
      deps: [ConfigurationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService,
    DialogService,
    DatePipe,
    TranslateService,
    TranslateStore,
    authenService,
    HttpErrorHandler,
    MessagingService,
    UserDataService,
    ShowMenuService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
