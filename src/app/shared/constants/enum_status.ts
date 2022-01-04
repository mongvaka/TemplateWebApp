export enum DocumentProcessStatus {
  Application = '10',
  ApplicationLine = '20',
  Agreement = '30',
  AgreementAssetFees = '31',
  LetterOfRenewalJournal = '32',
  AgentJobJournal = '33',
  AgreementEarlyPayoff = '34',
  LetterOfExpirationJournal = '35',
  AgreementClassificationJournal = '36',
  ProvisionJournal = '37',
  DutyStampJournal = '38',
  RepossessionAsset = '39',
  PurchaseAgreement = '40',
  PurchaseAgreementConfirmation = '41',
  TemporaryReceipt = '50',
  Receipt = '51',
  ImportReceiptHeader = '52',
  ImportReceiptLine = '53',
  Invoice = '60',
  TaxInvoice = '61',
  Waive = '70',
  CollectionActivities = '75',
  LetterOfOverdueJournal = '76',
  CollectionFeeTable = '77',
  Collateral = '80',
  CollateralMovementJournal = '81',
  PaymentStructure = '90',
  Consortium = '102',
  CreditAppRequestTable = '110',
  AssignmentAgreement = '120',
  Cheque = '130',
  Job = '140',
  Verification = '150',
  Purchase = '160',
  MainAgreement = '170',
  GuarantorAgreement = '180',
  BusinessCollateralAgreement = '190',
  AgreementDocument = '200',
  VendorPayment = '210',
  Withdrawal = '220',
  CustomerRefund = '230',
  BookmarkDocument = '240',
}
export enum PositionTransStatus {
  Draft = 850100,
  Post = 850110,
  CANCEL = 850120,
  APPROVED = 850130,
  COMPALTE = 850140,
}

export enum ProbationTransStatus {
  DRAFT = 860100,
  POST = 860110,
  REJECT = 860120,
  APPROVED = 860130,
  COMPELTE = 860140,
}
export enum ResignDocmentStatus {
  Draft = '84100',
  Post = '84110',
  Reject = '84120',
  Approved = '84130',
  Complete = '84140',
}
export enum LeaveTransDocmentStatus {
  Draft = '41100',
  Post = '41110',
  Cancel = '41120',
  Reject = '41130',
  Approved = '41140',
  Complete = '41150',
}
// export enum EmployeeStatus {//enum old
//   Probation = 0,
//   ThroughWork = 1,
//   Resign = 2,
//   BackToWork = 3,
//   ProbationPeriod = 4,
// }
export enum EmployeeStatus {
  //enum new
  Probation = 1,
  Normal = 2,
  Resign = 3,
}
export enum SalaryTransStatus {
  DRAFT = 870100,
  POST = 870110,
  REJECT = 870120,
  APPROVED = 870130,
  COMPLETE = 870140,
}

export enum OvertimeStatus {
  DRAFT = 890100,
  POST = 890110,
  REJECT = 890120,
  APPROVED = 890130,
  COMPLETE = 890140,
}
export enum EmployeeType {
  DAY_EMP = 20,
  MONTH_EMP = 10,
}
export enum TransferTransStatus {
  DRAFT = 880100,
  POST = 880110,
  REJECT = 880120,
  APPROVED = 880130,
  COMPLETE = 880140,
}
export enum RevisionTimeTransStatus {
  DRAFT = 900100,
  POST = 900110,
  REJECT = 900120,
  APPROVED = 900130,
  COMPLETE = 900140,
}
