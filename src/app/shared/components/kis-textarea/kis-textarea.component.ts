import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ColumnType } from 'app/shared/constants';
import { isNullOrUndefined } from 'app/shared/functions/value.function';
import {
  TextareaConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { KisBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-textarea',
  templateUrl: './cust-textarea.component.html',
  styleUrls: ['./cust-textarea.component.scss'],
})
export class KisTextareaComponent extends KisBaseComponent implements OnInit {
  //#region variable
  bindingModel: string;
  bindingValidation: TranslateModel;
  bindingConfig: TextareaConfigModel;
  bindingMaxlength: number;
  //#endregion
  //#region input props
  @Input() set kisModel(param: string) {
    this.bindingModel = isNullOrUndefined(param) ? null : param;
    this.validateModel(this.bindingModel, this.bindingValidation);
  }

  get kisModel(): string {
    return this.bindingModel;
  }
  @Input() set kisValidation(param: TranslateModel) {
    this.bindingValidation = param;
    this.validationNotification(param);
  }
  @Input() set kisConfig(param: TextareaConfigModel) {}
  @Input() set maxlength(param: number) {}
  //#endregion
  //#region output props
  @Output() kisModelChange = new EventEmitter<string>();
  //#endregion
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
    this.validateService.$formValidate.subscribe((data) => {
      this.validateModel(this.bindingModel, this.bindingValidation, true);
    });
  }
  ngOnInit(): void {
    super.setGetwayFieldType(this.bindingInputId, ColumnType.STRING);
  }
}
