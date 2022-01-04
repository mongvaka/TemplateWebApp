import { isNullOrUndefined, getParentNode } from './value.function';
import { AppInjector } from '../../app-injector';
import { RendererService } from '../services/renderer.service';
import { ElementType } from '../constants';

export function reCalcFunctionAndRelatedDialogPosition(event: any): void {
  if (
    !isNullOrUndefined(event.target.parentNode) &&
    !isNullOrUndefined(event.target.parentNode.parentNode) &&
    !isNullOrUndefined(event.target.parentNode.parentNode.previousSibling)
  ) {
    let ele = event.target.parentNode.parentNode.previousSibling;
    const ids = ['MENUWORKFLOW', 'MENURELATED', 'MENUFUNCTION', 'MENUGROUP'];
    let limited = 0;
    while (
      !isNullOrUndefined(ele) &&
      !isNullOrUndefined(ele.nodeName) &&
      (ele.nodeName !== ElementType.P_TIEREDMENU || limited > 10)
    ) {
      ele = ele.previousSibling;
      limited++;
    }
    if (!isNullOrUndefined(ele) && ids.some((s) => s === ele.id)) {
      let card = document.querySelector('.ivz-item-card');
      const modal = ele.querySelector('.p-tieredmenu-overlay');
      let btn = event.target.parentNode.parentNode;
      while (btn.previousSibling.nodeName === ElementType.COMMENT) {
        btn = btn.previousSibling;
      }
      if (!isNullOrUndefined(modal)) {
        // setTimeout(() => {
        //   if (!isNullOrUndefined(btn.closest('.ivz-div-panel-btn-group'))) {
        //     if (modal.clientWidth + btn.previousSibling.offsetLeft > card.clientWidth) {
        //       console.log('if',card.clientWidth ,modal.clientWidth,btn.previousSibling.offsetTop);
        //       modal.style.setProperty('left', `${card.clientWidth - modal.clientWidth}px`);
        //       modal.style.setProperty('top', `${btn.previousSibling.offsetTop + btn.previousSibling.clientHeight}px`);
        //     } else {
        //       console.log('else');
        //       modal.style.setProperty('left', `${btn.previousSibling.offsetLeft}px`);
        //       modal.style.setProperty('top', `${btn.previousSibling.offsetTop + btn.previousSibling.clientHeight}px`);
        //     }
        //   }
        // }, 100);
      }
    }
  }
}

export function reCalcMutipleSelectionDialogSize(event: any): void {
  const service = AppInjector.get(RendererService);
  const renderer = service.renderer;
  let length = 0;
  let wrapper, list, target, panel;
  if (event.target.classList.contains('ui-multiselect-trigger')) {
    wrapper = event.target.parentNode.querySelector(
      '.ui-multiselect-items-wrapper'
    );
    target = event.target.parentNode;
  } else if (
    event.target.classList.contains('ui-multiselect-label') ||
    event.target.classList.contains('ui-multiselect-trigger-icon')
  ) {
    wrapper = event.target.parentNode.parentNode.querySelector(
      '.ui-multiselect-items-wrapper'
    );
    target = event.target.parentNode.parentNode;
  }
  if (!isNullOrUndefined(wrapper)) {
    list = wrapper.querySelectorAll('span.ng-star-inserted');
    panel = wrapper.parentNode;
    if (
      !isNullOrUndefined(target.parentNode) &&
      !isNullOrUndefined(target.parentNode.parentNode) &&
      target.parentNode.parentNode.nodeName === 'TH'
    ) {
      list.forEach((ele: HTMLInputElement) => {
        if (ele.textContent.length > length) {
          length = ele.textContent.length;
        }
      });
      if (length > 10) {
        renderer.setStyle(
          wrapper,
          'width',
          `${((100 - length) * 0.01 * length).toString()}em`
        );
      }
      if (list.length < 6) {
        renderer.setStyle(panel, 'height', `${list.length * 2.5}em`);
      }
    }
  }
}

export function calendarListener(event: any): void {
  const service = AppInjector.get(RendererService);
  const renderer = service.renderer;
  if (
    event.target.classList.contains('ui-state-active') &&
    event.target.tagName === ElementType.A
  ) {
    const parent = getParentNode(event.target, 10);
    if (!isNullOrUndefined(parent)) {
      const divMessage = parent.querySelector('div.validated-tooltip-error');
      if (!isNullOrUndefined(divMessage)) {
        renderer.removeChild(parent, divMessage);
        const calendar = parent.querySelector('p-calendar');
        if (!isNullOrUndefined(calendar)) {
          renderer.removeClass(calendar, 'invalidated');
          renderer.addClass(calendar, 'validated');
        }
      }
    }
  } else if (
    event.target.classList.contains('ui-clickable') &&
    event.target.tagName === ElementType.SPAN
  ) {
    const parent = getParentNode(event.target, 8);
    if (!isNullOrUndefined(parent)) {
      const divMessage = parent.querySelector('div.validated-tooltip-error');
      if (!isNullOrUndefined(divMessage)) {
        renderer.removeChild(parent, divMessage);
        const calendar = parent.querySelector('p-calendar');
        if (!isNullOrUndefined(calendar)) {
          renderer.removeClass(calendar, 'invalidated');
          renderer.addClass(calendar, 'validated');
        }
      }
    }
  }
}
