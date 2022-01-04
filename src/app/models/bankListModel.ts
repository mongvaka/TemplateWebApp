import { BaseCompanyView } from 'app/core/interfaces/base/baseCompanyView';
export class BankListModel extends BaseCompanyView {
  bank_uuid: string = null;
  bank_code: string = null;
  bank_name: string = null;
  bank_branch: string = null;
  account_name: string = null;
}
