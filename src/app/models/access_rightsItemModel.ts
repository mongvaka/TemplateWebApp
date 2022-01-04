import { BaseCompanyView } from 'app/core/interfaces/base/baseCompanyView';
export class AccessRightsItemModel extends BaseCompanyView {
  access_rights_uuid: string = null;
  access_rights_code: string = null;
  access_rights_name: string = null;
  role_uuid: string = null;
  remark: string = null;
  description: string = null;
}
