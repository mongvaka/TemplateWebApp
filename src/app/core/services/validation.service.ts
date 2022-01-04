import {
  EventEmitter,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { UIControllerService } from './uiController.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  $formValidate = new EventEmitter<any>();
  invalidFields: string[] = [];
  constructor(private uiService: UIControllerService) {}
  addInvalidFiled(id: string): void {
    this.invalidFields.push(id);
  }
  clearInvalidFiled(): void {
    this.invalidFields = [];
  }
  getFormValidation(): boolean {
    this.uiService.setIncreaseReqCounter('formvalidate');
    this.clearInvalidFiled();
    this.$formValidate.emit({ isValid: true });
    this.uiService.setDecreaseReqCounter('formvalidate');
    return this.invalidFields.length === 0;
  }
}
