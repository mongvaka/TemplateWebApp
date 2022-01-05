import { NumberMode } from '../constants';
import { Uuid } from '../functions/value.function';

export const FormatConfig = {
  INTEGER: {
    type: NumberMode.DECIMAL,
    max: 2147483647,
    min: -2147483647,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 0,
    mode: '',
    suffix: '',
  },
  INTEGER_POS: {
    type: NumberMode.DECIMAL,
    max: 2147483647,
    min: 0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 0,
  },
  CURRENCY_13_2: {
    type: NumberMode.DECIMAL,
    max: 99999999999.99,
    min: -99999999999.99,
    grouping: true,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 2,
    mode: '',
    suffix: '',
  },
  CURRENCY_13_2_POS: {
    type: NumberMode.DECIMAL,
    max: 99999999999.99,
    min: 0,
    grouping: true,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 2,
    mode: '',
    suffix: '',
  },
  CURRENCY_16_5: {
    type: NumberMode.DECIMAL,
    max: 99999999999.99999,
    min: -99999999999.99999,
    grouping: true,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 5,
    mode: '',
    suffix: '',
  },
  CURRENCY_16_5_POS: {
    type: NumberMode.DECIMAL,
    max: 99999999999.99999,
    min: 0,
    grouping: true,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 5,
    mode: '',
    suffix: '',
  },
  PERCENT_13_10: {
    type: NumberMode.DECIMAL,
    max: 100.0,
    min: -100.0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 10,
    suffix: '%',
  },
  PERCENT_13_10_POS: {
    type: NumberMode.DECIMAL,
    max: 100.0,
    min: 0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 10,
    suffix: '%',
  },
  PERCENT_7_4: {
    type: NumberMode.DECIMAL,
    max: 100.0,
    min: -100.0,
    precision: 4,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 4,
    suffix: '%',
  },
  PERCENT_7_4_POS: {
    type: NumberMode.DECIMAL,
    max: 100.0,
    min: 0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 4,
    suffix: '%',
  },
  PERCENT_5_2: {
    type: NumberMode.DECIMAL,
    max: 100.0,
    min: -100.0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 2,
    suffix: '%',
  },
  PERCENT_5_2_POS: {
    type: NumberMode.DECIMAL,
    max: 100.0,
    min: 0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 2,
    suffix: '%',
  },
  YEAR: {
    type: NumberMode.DECIMAL,
    max: 275760,
    min: -275760,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 0,
  },
  MONTH: {
    type: NumberMode.DECIMAL,
    max: 12,
    min: 0,
    grouping: false,
    locale: 'th-TH',
    currency: 'THB',
    fractionDigits: 0,
  },
};

export const CalendarConfig = {
  DATE: {
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    dataType: 'string',
    selectionMode: 'single',
    showTime: false,
    timeOnly: false,
    hourFormat: null,
    showSeconds: false,
  },
  DATERANGE: {
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    dataType: 'string',
    selectionMode: 'range',
    showTime: false,
    timeOnly: false,
    hourFormat: null,
    showSeconds: false,
  },
  DATETIME: {
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    dataType: 'string',
    selectionMode: 'single',
    showTime: true,
    timeOnly: false,
    hourFormat: '24',
    showSeconds: true,
  },
  TIME: {
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    dataType: 'date',
    selectionMode: 'single',
    timeOnly: true,
    hourFormat: '24',
    showSeconds: true,
  },
};

export const CheckBoxConfig = {
  GENERAL: {
    groupName: 'group1',
    name: null,
    value: null,
    label: null,
    disabled: false,
    binary: false,
    readonly: false,
    required: false,
  },
  DEFAULT_CHECKBOX: {
    groupName: 'group1',
    name: null,
    value: null,
    label: null,
    disabled: false,
    binary: false,
    readonly: false,
    required: false,
  },
};

export const DropdownConfig = {
  GENERAL: {
    placeholder: 'Please select',
    virtualScroll: true,
    itemSize: 30,
    filter: true,
    autoDisplayFirst: false,
    showClear: true,
  },
  DEFAULT_DROPDOWN: {
    placeholder: 'Please select',
    virtualScroll: true,
    itemSize: 30,
    filter: true,
    autoDisplayFirst: false,
    showClear: true,
  },
};
export const InputTextConfig = {
  DEFAULT_INPUTTEXT: {
    maxlength: 100,
  },
  DEFAULT_INPUTTEXT_AREA: {
    maxlength: 250,
  },
  ID_INPUTTEXT: {
    maxlength: 20,
  },
  TAX_ID_INPUTTEXT: {
    maxlength: 13,
  },
};
export const InputNumberConfig = {
  GENERAL: {
    CustReadonly: true,
    CustModel: '01/01/2020',
  },
};
export const InputSwitchConfig = {
  GENERAL: {
    inputId: Uuid.newUuid(),
  },
  DEFAULT_INPUTSWITCH: {},
};
export const MultiSelectConfig = {
  GENERAL: {
    placeholder: 'Please select',
    virtualScroll: true,
    itemSize: 30,
    filter: true,
    autoDisplayFirst: false,
    showClear: true,
    panelStyle: null,
    maxSelectedLabels: 3,
    defaultLabel: null,
  },
  DEFAULT_MULTISELECT: {
    placeholder: 'Please select',
    virtualScroll: true,
    itemSize: 30,
    filter: true,
    autoDisplayFirst: false,
    showClear: true,
    panelStyle: null,
    maxSelectedLabels: 3,
    defaultLabel: null,
  },
};
export const RadioButtonConfig = {
  GENERAL: {
    name: 'groupname',
    value: 'val1',
    label: 'Option 1',
  },
  DEFAULT_RADIO: {
    name: 'groupname',
    value: 'val1',
    label: 'Option 1',
  },
};
export const TextareaConfig = {
  DEFAULT_TEXTAREA: {
    maxlength: 250,
  },
};

export const ButtonConfig = {
  ICON: {
    className: 'ui-button-info',
    icon: 'pi pi-save',
    iconPos: 'left',
  },
  SAVE: {
    className: 'ui-button-info',
    icon: 'pi pi-save',
    label: 'Save',
    iconPos: 'left',
  },
  SAVE_AND_CLOSE: {
    className: 'ui-button-info',
    icon: 'pi pi-times',
    label: 'Save & Close',
    iconPos: 'left',
  },
  CLOSE: {
    className: 'ui-button-info',
    icon: 'pi pi-power-off',
    label: 'Close',
    iconPos: 'left',
  },
  EXPORT: {
    className: 'ui-button-info',
    icon: 'pi pi-power-off',
    label: 'Close',
    iconPos: 'left',
  },
  COLUMNCHOOSER: {
    className: 'ui-button-info',
    icon: 'pi pi-power-off',
    label: 'Close',
    iconPos: 'left',
  },
};
