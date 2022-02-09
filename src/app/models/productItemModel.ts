import { BaseCompanyView } from 'app/core/interfaces/base/baseCompanyView';
export class ProductItemModel extends BaseCompanyView {
  bank_uuid: string = null;
  bank_code: string = null;
  bank_name: string = null;
  bank_branch: string = null;
  account_name: string = null;
  account_number: string = null;
  bank_category: number = 0;

  financial_amount: string = null;
  balance: string = null;
  spending_limit: string = null;
}
