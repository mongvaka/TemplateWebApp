import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { UIControllerService } from 'app/core/services/uiController.service';
import { ElementType } from '../constants';
import {
  isNullOrUndefined,
  switchAttribute,
  switchClass,
} from '../functions/value.function';

@Directive({
  selector: '[readonly]',
})
export class ReadonlyDirective implements OnInit {
  @Input()
  set readonly(fact: boolean) {
    switch (this.el.nativeElement.tagName) {
      case ElementType.P_DROPDOWN:
        this.setDropDown(fact);
        break;
      case ElementType.INPUT:
        this.setInput(fact);
        break;
      case ElementType.P_CALENDAR:
        this.setCalendar(fact);
        break;
      case ElementType.P_INPUTSWITCH:
        this.setSwitch(fact);
        break;
      case ElementType.P_MULTISELECT:
        this.setMulti(fact);
        break;
      case ElementType.TEXTAREA:
        this.setInput(fact);
        break;
      case ElementType.BUTTON:
        this.setButton(fact);
        break;
      case ElementType.P_RADIOBUTTON:
        this.setInput(fact);
        break;
      case ElementType.P_INPUTNUMBER:
        this.setInputNumber(fact);
        break;
      default:
        break;
    }
  }
  divParent;
  divMessage;
  constructor(
    private el: ElementRef,
    private uiService: UIControllerService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {}

  setInput(fact: boolean): void {
    if (fact) {
      switchClass(this.el.nativeElement, `iv-readonly`, true);
      switchAttribute(this.el.nativeElement, 'readonly', '', true);
      this.setRemoveValidate();
    } else {
      switchClass(this.el.nativeElement, `iv-readonly`, false);
      switchAttribute(this.el.nativeElement, 'readonly', '', false);
    }
  }
  setInputNumber(fact: boolean): void {
    const input = this.el.nativeElement.querySelector('input');
    if (fact) {
      switchClass(input, `iv-readonly`, true);
      switchAttribute(input, 'readonly', '', true);
      this.setRemoveValidate();
    } else {
      switchClass(input, `iv-readonly`, false);
      switchAttribute(input, 'readonly', '', false);
    }
  }
  setButton(fact: boolean): void {
    if (fact) {
      // switchClass(this.el.nativeElement, `iv-readonly`, true);
      switchAttribute(this.el.nativeElement, 'disabled', '', true);
      this.setRemoveValidate();
    } else {
      // switchClass(this.el.nativeElement, `iv-readonly`, false);
      switchAttribute(this.el.nativeElement, 'disabled', '', false);
    }
  }
  setDropDown(fact: boolean): void {
    if (fact) {
      switchClass(this.el.nativeElement, `iv-readonly`, true);
      this.setRemoveValidate();
    } else {
      switchClass(this.el.nativeElement, `iv-readonly`, false);
    }
  }
  setCalendar(fact: boolean): void {
    const input = this.el.nativeElement.querySelector('input');
    if (fact) {
      switchClass(this.el.nativeElement, `iv-readonly`, true);
      switchAttribute(input, `readonly`, '', true);
      this.setRemoveValidate();
    } else {
      switchClass(this.el.nativeElement, `iv-readonly`, false);
      switchAttribute(input, `readonly`, '', false);
    }
  }
  setSwitch(fact: boolean): void {
    const parent = this.el.nativeElement.parentNode;
    if (fact) {
      switchClass(this.el.nativeElement, `iv-readonly`, true);
      this.setRemoveValidate();
    } else {
      switchClass(this.el.nativeElement, `iv-readonly`, false);
    }
  }
  setMulti(fact: boolean): void {
    if (fact) {
      switchClass(this.el.nativeElement, `iv-readonly`, true);
      this.setRemoveValidate();
    } else {
      switchClass(this.el.nativeElement, `iv-readonly`, false);
    }
  }
  setRemoveValidate(): void {
    this.divParent = this.el.nativeElement.parentNode;
    if (
      !isNullOrUndefined(this.divParent.querySelector('div.validated-tooltip'))
    ) {
      this.divMessage = this.divParent.querySelector('div.validated-tooltip');
      this.renderer.removeChild(this.divParent, this.divMessage);
      this.renderer.removeClass(this.el.nativeElement, 'invalidated');
      this.renderer.addClass(this.el.nativeElement, 'validated');
    }
  }
}
