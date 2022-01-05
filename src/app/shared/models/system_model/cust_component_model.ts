export class CalendarConfigModel {
  public inputId?: string;
  public dateFormat?: string;
  public showIcon?: boolean;
  public dataType?: string;
  public selectionMode?: string;
  public showTime?: true;
  public timeOnly?: true;
  public hourFormat?: string;
  public showSeconds?: boolean;
}
export class CheckboxConfigModel {
  public inputId?: string;
  public name?: string;
  public value?: any;
  public label?: string;
  public disabled?: boolean;
  public binary?: boolean;
  public readonly?: boolean;
  public required?: boolean;
}

export class DropdownConfigModel {
  public inputId?: string;
  public virtualScroll?: boolean;
  public itemSize?: number;
  public filter?: boolean;
  public placeholder?: string;
  public autoDisplayFirst?: boolean;
  public showClear?: boolean;
  public options?: any[];
}

export class InputTextConfigModel {
  //public inputId: string;
  public maxlength?: number;
}
export class InputNumberConfigModel {
  //public inputId: string;
  public mode!: string;
  public max!: number;
  public min!: number;
  public fractionDigits!: number;
  public grouping!: boolean;
  public suffix!: string;
}
export class InputSwitchConfigModel {
  public inputId!: string;
}
export class MultipleSelectConfigModel {
  public inputId?: string;
  public virtualScroll?: boolean;
  public itemSize?: number;
  public filter?: boolean;
  public placeholder?: string;
  public autoDisplayFirst?: boolean;
  public showClear?: boolean;
  public options?: any[];
  public defaultLabel?: string;
  public panelStyle?: string;
  public maxSelectedLabels?: number;
}
export class RadioButtonConfigModel {
  public inputId!: string;
  public name!: string;
  public value!: string;
  public label!: string;
}
export class TextareaConfigModel {
  public inputId?: string;
  public rows?: number;
  public cols?: number;
  public maxlength?: number;
  public autoResize?: string;
  public disabled?: boolean;
}

export class ButtonConfigModel {
  public inputId?: string;
  public className?: string;
  public icon?: string;
  public iconPos?: string;
  public label?: string;
  public disabled?: boolean;
}
export class LoginResultModel {
  public result: any;
  public refresh: string;
  public code: number;
  public error_message: string;
  public message: string;
}
