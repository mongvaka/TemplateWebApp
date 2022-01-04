import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import { isNullOrUndefined, switchClass } from '../functions/value.function';
import { interval } from 'rxjs';
import { FieldAccessing } from '../models/system_model';
import { AppConst, Ordinal } from '../constants';
import { UIControllerService } from 'app/core/services/uiController.service';

@Directive({ selector: '[viewonly]' })
export class ViewOnlyDirective implements OnInit {
  isView = false;
  header: any;
  body: any;
  save: any;
  saveNclose: any;
  isSeted = false;
  inputs: any;
  ddls: any;
  calendars: any;
  textAreas: any;
  switch: any;
  multi: any;
  fieldSets: any;
  inVisibility = false;
  isShowLog = false;
  factors: boolean[] = [];
  ordinal = Ordinal;
  @Input()
  set viewonly(_isview: boolean) {
    if (!isNullOrUndefined(_isview)) {
      switchClass(this.elementRef.nativeElement, 'view-only', _isview);
      if (_isview) {
        const fields: FieldAccessing[] = [
          { filedIds: [AppConst.VIEWMODE_ID], readonly: true },
        ];
        this.uiService.setUIFieldsAccessing(fields);
      } else {
        const fields: FieldAccessing[] = [
          { filedIds: [AppConst.CLEAR_ID], readonly: false },
        ];
        this.uiService.setUIFieldsAccessing(fields);
      }
    }
  }
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private uiService: UIControllerService
  ) {}
  ngOnInit(): void {}
}
