export enum itemViewMode {
  create = 0,
  update = 1,
  view = 2,
}

export enum ColumnType {
  STRING = 'STRING',
  INT = 'INT',
  DATE = 'DATE',
  DATERANGE = 'DATERANGE',
  BOOLEAN = 'BOOLEAN',
  MASTER = 'MASTER',
  ENUM = 'ENUM',
  DECIMAL = 'DECIMAL',
  VARIABLE = 'VARIABLE',
  VARIABLES = 'VARIABLES',
  MASTERSINGLE = 'MASTERSINGLE',
  CONTROLLER = 'CONTROLLER',
  HIDDEN = 'HIDDEN',
}
export enum SortType {
  ASC = 1,
  DESC = 0,
  NONE = null,
}
export enum BracketType {
  None = 0,
  SingleStart = 1,
  SingleEnd = 2,
  DoubleStart = 3,
  DoubleEnd = 4,
}
export enum AccessMode {
  noAccess,
  viewer,
  editor,
  creator,
  full,
}

export enum LogType {
  SYSTEM,
  NORMAL,
}
export enum AccessLevel {
  None,
  User,
  Department,
  Branch,
  Company,
}
export enum ElementType {
  P_DROPDOWN = 'P-DROPDOWN',
  P_CALENDAR = 'P-CALENDAR',
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  BUTTON = 'BUTTON',
  P_RADIOBUTTON = 'P-RADIOBUTTON',
  P_CHECKBOX = 'P-CHECKBOX',
  IV_PERCENT_INPUT = 'IV-PERCENT-INPUT',
  P_INPUTSWITCH = 'P-INPUTSWITCH',
  P_MULTISELECT = 'P-MULTISELECT',
  P_SELECTBUTTON = 'P-SELECTBUTTON',
  COMMENT = '#comment',
  P_TIEREDMENU = 'P-TIEREDMENU',
  A = 'A',
  SPAN = 'SPAN',
  P_INPUTNUMBER = 'P-INPUTNUMBER',
  LABEL = 'LABEL',
}
export enum HTTPTYPE {
  REQUESTING,
  RESPONSED,
  CLIENTPROCESS,
}
export enum MaskType {
  NUMBER,
  CURRENCY,
  PERCENT,
}
export enum Ordinal {
  Clear,
  System,
  First,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Eighth,
  Ninth,
  Tenth,
  E11,
  E12,
  E13,
  E14,
  E15,
  E16,
  E17,
  E18,
  E19,
  E20,
  Batch01,
  Batch02,
  Batch03,
  Batch04,
  Batch05,
  Batch06,
  Batch07,
  ViewOnly,
}
export enum PathType {
  LIST = 'list',
  ITEM = 'item',
}
