import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  Input,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { UIControllerService } from 'app/core/services/uiController.service';
import { ValidationService } from 'app/core/services/validation.service';
import { interval, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { FormValidationModel } from '../models/system_model';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[formValidate]' })
export class FormValidateDirective implements OnInit {
  @Output() formValidate = new EventEmitter<FormValidationModel>();
  isShowLog: boolean;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private uiService: UIControllerService,
    private validateService: ValidationService
  ) {
    this.isShowLog = false;
  }
  @HostListener('click', ['$event.target'])
  onClick(btn): void {
    this.uiService.setIncreaseReqCounter('formvalidate');
    this.validateService.clearInvalidFiled();
    this.validateService.$formValidate.emit({ isValid: true });

    this.formValidate.emit({
      isValid: this.validateService.invalidFields.length === 0,
      invalidId: this.validateService.invalidFields,
    });
    this.uiService.setDecreaseReqCounter('formvalidate');
  }
  setResult(): void {}
  setClearClass(): void {}
  setFocus(): void {}
  getValidation(): void {}
  ngOnInit(): void {}
  setCalendar(el: any): void {
    this.renderer.addClass(el.parentNode, 'hide-datepicker');
    const input = el.querySelectorAll('input');
    input[0].focus();
    setTimeout(() => {
      this.renderer.removeClass(el.parentNode, 'hide-datepicker');
    }, 100);
  }
}
