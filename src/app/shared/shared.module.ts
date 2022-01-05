import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SlideMenuModule } from 'primeng/slidemenu';

import { CustStytemComponent } from './components/cust-stytem/cust-stytem.component';
import { CustSelectRowComponent } from './components/cust-select-row/cust-select-row.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from './layout/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';

import { CustToastComponent } from './components/cust-toast/cust-toast.component';
import { SubMenuComponent } from './layout/sub-menu/sub-menu.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CustDataGridComponent } from './components/cust-dataGrid/cust-dataGrid.component';
import { DataGridColumnPipe } from './pipes/dgColumn.pipe';
import { DataDisplay } from './pipes/dataDisplay.pipe';
import { CustBaseComponent } from './components/cust-base/cust-base';
import { CustInputTextComponent } from './components/cust-input-text/cust-input-text';
import { CustInputNumberComponent } from './components/cust-input-number/cust-input-number.component';
import { CustCalendarComponent } from './components/cust-calendar/cust-calendar.component';
import { CustDropdownComponent } from './components/cust-dropdown/cust-dropdown.component';
import { CustMultiSelectComponent } from './components/cust-multi-select/cust-multi-select.component';

import { ValidationDirective } from './directives/validation.directive';
import { FormValidateDirective } from './directives/formValidate.directive';
import { RequiredDirective } from './directives/required.directive';
import { ViewOnlyDirective } from './directives/viewOnly.directive';
import { ReadonlyDirective } from './directives/readonly.directive';
import { CustAlertComponent } from './components/cust-alert/cust-alert.component';
import { CustButtonComponent } from './components/cust-button/cust-button.component';
import { CustInputSwitchComponent } from './components/cust-input-switch/cust-input-switch.component';
import { CustListboxComponent } from './components/cust-listbox/cust-listbox.component';
import { CustTextareaComponent } from './components/cust-textarea/cust-textarea.component';
import { CustTieredMenuComponent } from './components/cust-tiered-menu/cust-tiered-menu.component';
import { CustFileUploadComponent } from './components/cust-file-upload/cust-file-upload.component';
import { CustLoadingComponent } from './components/cust-loading/cust-loading.component';
import { CustModalComponent } from './components/cust-modal/cust-modal.component';
import { CustFileExcelUploadComponent } from './components/cust-file-excel-upload/cust-file-excel-upload.component';
const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const SHARED_MODULES = [TranslateModule];
const COMPONENTS = [
  CustBaseComponent,
  CustInputTextComponent,
  CustStytemComponent,
  CustSelectRowComponent,
  CustToastComponent,
  CustDataGridComponent,
  CustInputNumberComponent,
  CustCalendarComponent,
  CustDropdownComponent,
  CustMultiSelectComponent,
  CustAlertComponent,
  CustButtonComponent,
  CustInputSwitchComponent,
  CustListboxComponent,
  CustTextareaComponent,
  CustTieredMenuComponent,
  CustFileUploadComponent,
  CustLoadingComponent,
  CustModalComponent,
  CustFileExcelUploadComponent,
];
const LAYOUTS = [
  LeftMenuComponent,
  TopMenuComponent,
  FooterComponent,
  SubMenuComponent,
];
const PIPES = [DataGridColumnPipe, DataDisplay];
const DIRECTIVE = [
  ReadonlyDirective,
  ViewOnlyDirective,
  RequiredDirective,
  FormValidateDirective,
  ValidationDirective,
];

const PRIMENG_MODULES = [
  PanelModule,
  ButtonModule,
  OverlayPanelModule,
  TableModule,
  CheckboxModule,
  TieredMenuModule,
  InputNumberModule,
  InputTextModule,
  DropdownModule,
  MultiSelectModule,
  FieldsetModule,
  ListboxModule,
  ToastModule,
  CardModule,
  TreeModule,
  MenubarModule,
  CalendarModule,
  InputSwitchModule,
  RadioButtonModule,
  ConfirmDialogModule,
  InputTextareaModule,
  DynamicDialogModule,
  DialogModule,
  TabViewModule,
  PickListModule,
  StepsModule,
  HttpClientModule,
  NgxPaginationModule,
  Ng2OrderModule,
  Ng2SearchPipeModule,
  AccordionModule,
  ChartModule,
  NgxChartsModule,
  PanelMenuModule,
  TieredMenuModule,
  SlideMenuModule,
  FileUploadModule,
  DialogModule,
  PaginatorModule,
];

@NgModule({
  imports: [...BASE_MODULES, ...PRIMENG_MODULES, ...SHARED_MODULES],
  exports: [
    ...PRIMENG_MODULES,
    ...SHARED_MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVE,
    ...LAYOUTS,
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVE,
    ...LAYOUTS,
    CustModalComponent,
  ],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
