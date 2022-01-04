import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEmpComponent } from './dashboard_emp/dashboard_emp.component';
import { SharedModule } from 'app/shared/shared.module';
import { ConfigurationService } from 'app/core/services/configurtion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/shared/services/auth.interceptor';

@NgModule({
  declarations: [DashboardEmpComponent],
  imports: [CommonModule, SharedModule],
  exports: [DashboardEmpComponent],
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
export class DashboardEmpModule {}
