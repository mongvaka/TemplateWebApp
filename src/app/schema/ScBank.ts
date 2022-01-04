export abstract class ScBank {
  static readonly tb_name: string = `bank_table`;
  static readonly tb = {
    bank_uuid: `${ScBank.tb_name}.bank_uuid`,
    bank_code: `${ScBank.tb_name}.bank_code`,
    bank_name: `${ScBank.tb_name}.bank_name`,
    bank_branch: `${ScBank.tb_name}.bank_branch`,
    account_name: `${ScBank.tb_name}.account_name`,
    account_number: `${ScBank.tb_name}.account_number`,
    bank_category: `${ScBank.tb_name}.bank_category`,
    financial_amount: `${ScBank.tb_name}.financial_amount`,
    balance: `${ScBank.tb_name}.balance`,
    spending_limit: `${ScBank.tb_name}.spending_limit`,
    company_uuid: `${ScBank.tb_name}.company_uuid`,
    branch_uuid: `${ScBank.tb_name}.branch_uuid`,
    ref_uuid: `${ScBank.tb_name}.ref_uuid`,
    ref_type: `${ScBank.tb_name}.ref_type`,
    is_active: `${ScBank.tb_name}.is_active`,
    create_by: `${ScBank.tb_name}.create_by`,
    create_date: `${ScBank.tb_name}.create_date`,
    update_by: `${ScBank.tb_name}.update_by`,
    update_date: `${ScBank.tb_name}.update_date`,
  };
  static readonly jn = {
    bank_uuid: `${ScBank.tb_name}_bank_uuid`,
    bank_code: `${ScBank.tb_name}_bank_code`,
    bank_name: `${ScBank.tb_name}_bank_name`,
    bank_branch: `${ScBank.tb_name}_bank_branch`,
    account_name: `${ScBank.tb_name}_account_name`,
    account_number: `${ScBank.tb_name}_account_number`,
    bank_category: `${ScBank.tb_name}_bank_category`,
    financial_amount: `${ScBank.tb_name}_financial_amount`,
    balance: `${ScBank.tb_name}_balance`,
    spending_limit: `${ScBank.tb_name}_spending_limit`,
    company_uuid: `${ScBank.tb_name}_company_uuid`,
    branch_uuid: `${ScBank.tb_name}_branch_uuid`,
    ref_uuid: `${ScBank.tb_name}_ref_uuid`,
    ref_type: `${ScBank.tb_name}_ref_type`,
    is_active: `${ScBank.tb_name}_is_active`,
    create_by: `${ScBank.tb_name}_create_by`,
    create_date: `${ScBank.tb_name}_create_date`,
    update_by: `${ScBank.tb_name}_update_by`,
    update_date: `${ScBank.tb_name}_update_date`,
  };
  static readonly bank_uuid: string = `bank_uuid`;
  static readonly bank_code: string = `bank_code`;
  static readonly bank_name: string = `bank_name`;
  static readonly bank_branch: string = `bank_branch`;
  static readonly account_name: string = `account_name`;
  static readonly account_number: string = `account_number`;
  static readonly bank_category: string = `bank_category`;
  static readonly financial_amount: string = `financial_amount`;
  static readonly balance: string = `balance`;
  static readonly spending_limit: string = `spending_limit`;
  static readonly company_uuid: string = `company_uuid`;
  static readonly branch_uuid: string = `branch_uuid`;
  static readonly ref_uuid: string = `ref_uuid`;
  static readonly ref_type: string = `ref_type`;
  static readonly is_active: string = `is_active`;
  static readonly create_by: string = `create_by`;
  static readonly create_date: string = `create_date`;
  static readonly update_by: string = `update_by`;
  static readonly update_date: string = `update_date`;
}
