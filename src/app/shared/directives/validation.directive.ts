import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Renderer2,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElementType } from '../constants';
import {
  isNullOrUndefined,
  isUndefinedOrZeroLength,
  replaceFormat,
  isNullOrUndefOrEmpty,
} from '../functions/value.function';
import { TranslateModel } from '../models/system_model';

@Directive({
  selector: '[ivValidation]',
})
export class ValidationDirective implements AfterViewInit {
  divMessage;
  divParent;
  messageFn: string;
  elementText: string;
  private validateFn: TranslateModel;
  // tslint:disable-next-line:no-input-rename
  @Input()
  set ivValidation(param: TranslateModel) {
    this.validateFn = param;
  }
  @Input()
  set ngModel(val: any) {
    setTimeout(() => {}, 100);
  }
  @Input()
  set validate(model: any) {
    this.getFocus();
    this.getBlur();
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onValidated = new EventEmitter<string>();
  ngAfterViewInit(): void {
    if (!this.el.nativeElement.classList.contains('directive-ivvalidation')) {
      this.renderer.addClass(this.el.nativeElement, 'directive-validation');
    }
    switch (this.el.nativeElement.tagName) {
      case ElementType.P_CALENDAR:
        this.setCalendar();
        break;
      default:
        break;
    }
  }

  @HostListener('focus')
  onFocus(): void {
    this.getFocus();
  }
  @HostListener('blur')
  onBlur(): void {
    this.getBlur();
  }
  @HostListener('click', ['$event.target'])
  onClick(): void {
    this.getClick();
  }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}
  setCalendar(): void {
    const input = this.el.nativeElement.querySelectorAll('input');
    this.renderer.listen(input[0], 'focus', () => {
      this.divParent = this.el.nativeElement.parentNode;
      if (this.divParent.querySelector('div.validated-tooltip') === null) {
        this.divMessage = this.renderer.createElement('div');
        this.renderer.addClass(this.divMessage, 'validated-tooltip');
      }
    });
    this.renderer.listen(input[0], 'blur', () => {
      setTimeout(() => {
        if (!isNullOrUndefOrEmpty(this.validateFn)) {
          this.messageFn = this.translate.get(`${this.validateFn.code}`)[
            'value'
          ];
          if (!isUndefinedOrZeroLength(this.validateFn.parameters)) {
            this.messageFn = replaceFormat(
              this.messageFn,
              this.validateFn.parameters
            );
          }
          if (
            this.divParent.querySelector('div.validated-tooltip-error') !== null
          ) {
            this.renderer.removeClass(
              this.divMessage,
              'validated-tooltip-error'
            );
          }
          if (
            this.divParent.querySelector('div.validated-tooltip-error') === null
          ) {
            this.divMessage.innerHTML = '';
            const message = this.renderer.createText(this.messageFn);
            this.renderer.appendChild(this.divMessage, message);
            this.renderer.appendChild(this.divParent, this.divMessage);
            this.renderer.addClass(this.divMessage, 'validated-tooltip-error');
          }
          this.renderer.addClass(this.el.nativeElement, 'invalidated');
          this.renderer.removeClass(this.el.nativeElement, 'validated');
        } else {
          this.renderer.removeChild(this.divParent, this.divMessage);
          this.renderer.removeClass(this.el.nativeElement, 'invalidated');
          this.renderer.addClass(this.el.nativeElement, 'validated');
        }
        this.onValidated.emit(this.messageFn);
      }, 100);
    });
  }

  getClick(): void {
    if (
      this.el.nativeElement.tagName === ElementType.P_DROPDOWN ||
      this.el.nativeElement.tagName === ElementType.P_MULTISELECT ||
      this.el.nativeElement.tagName === ElementType.P_INPUTSWITCH ||
      this.el.nativeElement.tagName === ElementType.P_SELECTBUTTON
    ) {
      this.divParent = this.el.nativeElement.parentNode;
      if (this.divParent.querySelector('div.validated-tooltip') === null) {
        this.divMessage = this.renderer.createElement('div');
        this.renderer.addClass(this.divMessage, 'validated-tooltip');
      }
      if (!isNullOrUndefined(this.validateFn)) {
        this.messageFn = this.translate.get(`${this.validateFn.code}`)['value'];
        if (!isUndefinedOrZeroLength(this.validateFn.parameters)) {
          this.messageFn = replaceFormat(
            this.messageFn,
            this.validateFn.parameters
          );
        }
        if (
          this.divParent.querySelector('div.validated-tooltip-error') === null
        ) {
          const message = this.renderer.createText(this.messageFn);
          this.renderer.appendChild(this.divMessage, message);
          this.renderer.appendChild(this.divParent, this.divMessage);
          this.renderer.addClass(this.divMessage, 'validated-tooltip-error');
          if (this.el.nativeElement.tagName === ElementType.P_DROPDOWN) {
            this.renderer.addClass(
              this.divParent.querySelector('p-dropdown'),
              'input-rerender'
            );
          } else if (
            this.el.nativeElement.tagName === ElementType.P_MULTISELECT
          ) {
            this.renderer.addClass(
              this.divParent.querySelector('p-multiselect'),
              'input-rerender'
            );
          } else if (
            this.el.nativeElement.tagName === ElementType.P_INPUTSWITCH
          ) {
            this.renderer.addClass(
              this.divParent.querySelector('p-inputSwitch'),
              'input-rerender'
            );
          } else if (
            this.el.nativeElement.tagName === ElementType.P_SELECTBUTTON
          ) {
            this.renderer.addClass(
              this.divParent.querySelector('p-selectbutton'),
              'input-rerender'
            );
          }
        }
        this.renderer.addClass(this.el.nativeElement, 'invalidated');
        this.renderer.removeClass(this.el.nativeElement, 'validated');
      } else {
        if (this.el.nativeElement.tagName === ElementType.P_DROPDOWN) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-dropdown'),
            'input-rerender'
          );
        } else if (
          this.el.nativeElement.tagName === ElementType.P_MULTISELECT
        ) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-multiselect'),
            'input-rerender'
          );
        } else if (
          this.el.nativeElement.tagName === ElementType.P_INPUTSWITCH
        ) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-inputSwitch'),
            'input-rerender'
          );
        } else if (
          this.el.nativeElement.tagName === ElementType.P_SELECTBUTTON
        ) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-selectbutton'),
            'input-rerender'
          );
        }
        this.renderer.removeChild(this.divParent, this.divMessage);
        this.renderer.removeClass(this.el.nativeElement, 'invalidated');
        this.renderer.addClass(this.el.nativeElement, 'validated');
      }
      this.onValidated.emit(this.messageFn);
    }
  }
  getFocus(): void {
    this.divParent = this.el.nativeElement.parentNode;
    if (this.divParent.querySelector('div.validated-tooltip') === null) {
      this.divMessage = this.renderer.createElement('div');
      this.renderer.addClass(this.divMessage, 'validated-tooltip');
    }
  }
  getBlur(): void {
    this.elementText = this.el.nativeElement.tagName.toLowerCase();
    if (!isNullOrUndefined(this.validateFn)) {
      this.messageFn = this.translate.get(`${this.validateFn.code}`)['value'];
      if (!isUndefinedOrZeroLength(this.validateFn.parameters)) {
        this.messageFn = replaceFormat(
          this.messageFn,
          this.validateFn.parameters
        );
      }
      if (
        this.divParent.querySelector('div.validated-tooltip-error') === null
      ) {
        const message = this.renderer.createText(this.messageFn);
        this.renderer.appendChild(this.divMessage, message);
        this.renderer.appendChild(this.divParent, this.divMessage);
        this.renderer.addClass(this.divMessage, 'validated-tooltip-error');
        this.renderer.addClass(
          this.divParent.querySelector(this.elementText),
          'input-rerender'
        );
      } else {
        this.divParent.querySelector('div.validated-tooltip-error').innerHTML =
          this.messageFn;
      }
      this.renderer.addClass(this.el.nativeElement, 'invalidated');
      this.renderer.removeClass(this.el.nativeElement, 'validated');
    } else {
      this.renderer.removeClass(
        this.divParent.querySelector(this.elementText),
        'input-rerender'
      );
      this.renderer.removeChild(this.divParent, this.divMessage);
      this.renderer.removeClass(this.el.nativeElement, 'invalidated');
      this.renderer.addClass(this.el.nativeElement, 'validated');
    }
    this.onValidated.emit(this.messageFn);
  }
}
