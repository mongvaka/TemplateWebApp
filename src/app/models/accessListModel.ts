import { BaseCompanyView } from 'app/core/interfaces/base/baseCompanyView';
export class AccessListModel extends BaseCompanyView {
  access_uuid: string = null;
  subscribe_trans_table_uuid: string = null;
  role_values: string = null;
  feature_values: string = null;
  role_table_uuid: string = null;
  can_create: boolean = false;
  can_edit: boolean = false;
  can_read: boolean = false;
  can_delete: boolean = false;
  can_action: boolean = false;
}
