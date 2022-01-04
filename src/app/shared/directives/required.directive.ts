import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import { ElementType } from '../constants';
import {
  isNullOrUndefined,
  isNullOrUndefOrEmpty,
} from '../functions/value.function';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[required]' })
export class RequiredDirective implements OnInit {
  // tslint:disable-next-line: variable-name
  _visibility = true;
  @Input()
  set required(val: boolean) {
    if (this.elementRef.nativeElement.tagName === ElementType.LABEL) {
      if (isNullOrUndefOrEmpty(val)) {
        this._visibility = true;
      } else {
        this._visibility = val ? true : false;
      }
      if (this._visibility) {
        if (!this.elementRef.nativeElement.classList.contains('required')) {
          this.renderer.addClass(this.elementRef.nativeElement, 'required');
        }
      } else {
        if (this.elementRef.nativeElement.classList.contains('required')) {
          this.renderer.removeClass(this.elementRef.nativeElement, 'required');
        }
      }
    }
  }
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.elementRef.nativeElement.tagName === ElementType.LABEL) {
      if (isNullOrUndefined(this._visibility) || this._visibility) {
        if (!this.elementRef.nativeElement.classList.contains('required')) {
          this.renderer.addClass(this.elementRef.nativeElement, 'required');
        }
      } else {
        if (this.elementRef.nativeElement.classList.contains('required')) {
          this.renderer.removeClass(this.elementRef.nativeElement, 'required');
        }
      }
    }
  }
}
