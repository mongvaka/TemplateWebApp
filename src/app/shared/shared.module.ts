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

import { KisStytemComponent } from './components/cust-stytem/cust-stytem.component';
import { KisSelectRowComponent } from './components/cust-select-row/cust-select-row.component';
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

import { KisToastComponent } from './components/cust-toast/cust-toast.component';
import { SubMenuComponent } from './layout/sub-menu/sub-menu.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KisDataGridComponent } from './components/cust-dataGrid/cust-dataGrid.component';
import { DataGridColumnPipe } from './pipes/dgColumn.pipe';
import { DataDisplay } from './pipes/dataDisplay.pipe';
import { KisBaseComponent } from './components/cust-base/cust-base';
import { KisInputTextComponent } from './components/cust-input-text/cust-input-text';
import { KisInputNumberComponent } from './components/cust-input-number/cust-input-number.component';
import { KisCalendarComponent } from './components/cust-calendar/cust-calendar.component';
import { KisDropdownComponent } from './components/cust-dropdown/cust-dropdown.component';
import { KisMultiSelectComponent } from './components/cust-multi-select/cust-multi-select.component';

import { ValidationDirective } from './directives/validation.directive';
import { FormValidateDirective } from './directives/formValidate.directive';
import { RequiredDirective } from './directives/required.directive';
import { ViewOnlyDirective } from './directives/viewOnly.directive';
import { ReadonlyDirective } from './directives/readonly.directive';
import { KisAlertComponent } from './components/cust-alert/cust-alert.component';
import { KisButtonComponent } from './components/cust-button/cust-button.component';
import { KisInputSwitchComponent } from './components/cust-input-switch/cust-input-switch.component';
import { KisListboxComponent } from './components/cust-listbox/cust-listbox.component';
import { KisTextareaComponent } from './components/cust-textarea/cust-textarea.component';
import { KisTieredMenuComponent } from './components/cust-tiered-menu/cust-tiered-menu.component';
import { KisFileUploadComponent } from './components/cust-file-upload/cust-file-upload.component';
import { KisLoadingComponent } from './components/cust-loading/cust-loading.component';
import { KisModalComponent } from './components/cust-modal/cust-modal.component';
import { KisFileExcelUploadComponent } from './components/cust-file-excel-upload/cust-file-excel-upload.component';
const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const SHARED_MODULES = [TranslateModule];
const COMPONENTS = [
  KisBaseComponent,
  KisInputTextComponent,
  KisStytemComponent,
  KisSelectRowComponent,
  KisToastComponent,
  KisDataGridComponent,
  KisInputNumberComponent,
  KisCalendarComponent,
  KisDropdownComponent,
  KisMultiSelectComponent,
  KisAlertComponent,
  KisButtonComponent,
  KisInputSwitchComponent,
  KisListboxComponent,
  KisTextareaComponent,
  KisTieredMenuComponent,
  KisFileUploadComponent,
  KisLoadingComponent,
  KisModalComponent,
  KisFileExcelUploadComponent,
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
    KisModalComponent,
  ],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
