export abstract class ScCompany {
  static readonly tb_name: string = `company_table`;
  static readonly tb = {
    company_uuid: `${ScCompany.tb_name}.company_uuid`,
    default_branch_uuid: `${ScCompany.tb_name}.default_branch_uuid`,
    create_date: `${ScCompany.tb_name}.create_date`,
    update_date: `${ScCompany.tb_name}.update_date`,
    ref_uuid: `${ScCompany.tb_name}.ref_uuid`,
    ref_type: `${ScCompany.tb_name}.ref_type`,
    company_id: `${ScCompany.tb_name}.company_id`,
    company_name: `${ScCompany.tb_name}.company_name`,
    create_by: `${ScCompany.tb_name}.create_by`,
    update_by: `${ScCompany.tb_name}.update_by`,
  };
  static readonly jn = {
    company_uuid: `${ScCompany.tb_name}_company_uuid`,
    default_branch_uuid: `${ScCompany.tb_name}_default_branch_uuid`,
    create_date: `${ScCompany.tb_name}_create_date`,
    update_date: `${ScCompany.tb_name}_update_date`,
    ref_uuid: `${ScCompany.tb_name}_ref_uuid`,
    ref_type: `${ScCompany.tb_name}_ref_type`,
    company_id: `${ScCompany.tb_name}_company_id`,
    company_name: `${ScCompany.tb_name}_company_name`,
    create_by: `${ScCompany.tb_name}_create_by`,
    update_by: `${ScCompany.tb_name}_update_by`,
  };
  static readonly company_uuid: string = `company_uuid`;
  static readonly default_branch_uuid: string = `default_branch_uuid`;
  static readonly create_date: string = `create_date`;
  static readonly update_date: string = `update_date`;
  static readonly ref_uuid: string = `ref_uuid`;
  static readonly ref_type: string = `ref_type`;
  static readonly company_id: string = `company_id`;
  static readonly company_name: string = `company_name`;
  static readonly create_by: string = `create_by`;
  static readonly update_by: string = `update_by`;
}
