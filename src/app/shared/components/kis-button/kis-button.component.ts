import { Uuid } from './../../functions/value.function';
import {
  Output,
  OnInit,
  EventEmitter,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Component, Input } from '@angular/core';
import {
  isNullOrUndefined,
  switchClass,
} from 'app/shared/functions/value.function';
import { ButtonConfigModel } from 'app/shared/models/system_model';
import { KisBaseComponent } from '../cust-base/cust-base';
import { setBodyActionMode } from '../../functions/routing.function';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-button',
  templateUrl: './cust-button.component.html',
  styleUrls: ['./cust-button.component.scss'],
})
export class KisButtonComponent extends KisBaseComponent implements OnInit {
  bindingConfig: ButtonConfigModel;
  bindingLabel: string;
  bindingClassName: string;
  bindingIcon: string;
  bindingDisabled: boolean;
  bindingFunctionMode: boolean;
  bindingIconPos: string;
  @Input() set kisConfig(param: ButtonConfigModel) {
    this.bindingInputId = isNullOrUndefined(this.bindingInputId)
      ? Uuid.newUuid()
      : this.bindingInputId;
  }

  @Output() kisClick = new EventEmitter<any>();

  @Input() set label(param: string) {
    this.bindingLabel = isNullOrUndefined(param)
      ? this.bindingConfig.label
      : param;
  }

  @Input() set icon(param: string) {
    this.bindingIcon = isNullOrUndefined(param)
      ? this.bindingConfig.label
      : param;
  }
  @Input() set disabled(param: boolean) {
    this.bindingDisabled = isNullOrUndefined(param)
      ? this.bindingConfig.disabled
      : param;
    if (this.bindingDisabled) {
      switchClass(this.el.nativeElement, 'no-click', this.bindingDisabled);
    } else {
      switchClass(this.el.nativeElement, 'no-click', false);
    }
  }

  @Input() set className(param: string) {
    this.bindingClassName = isNullOrUndefined(param)
      ? this.bindingConfig.className
      : param;
  }
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
  }
  @Input() set iconPos(param: string) {
    this.bindingIconPos = isNullOrUndefined(param)
      ? this.bindingConfig.iconPos
      : param;
  }
  ngOnInit(): void {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.bindingFunctionMode) {
      setBodyActionMode(!this.bindingFunctionMode);
    }
    super.ngOnDestroy();
  }
}
