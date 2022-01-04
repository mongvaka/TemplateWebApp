import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHrComponent } from './dashboard_hr/dashboard_hr.component';
import { SharedModule } from 'app/shared/shared.module';
import { ConfigurationService } from 'app/core/services/configurtion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/shared/services/auth.interceptor';

@NgModule({
  declarations: [DashboardHrComponent],
  imports: [CommonModule, SharedModule],
  exports: [DashboardHrComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
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
  ],
})
export class DashboardHrModule {}
