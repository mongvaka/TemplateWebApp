import { BaseCompanyView } from 'app/core/interfaces/base/baseCompanyView';
export class UserItemModel extends BaseCompanyView {
  user_uuid: string = null;
  user_password: string = null;
  user_name: string = null;
  employee_uuid: string = null;
  role_uuid: string = null;
  subscribe_uuid: string = null;
  languageid: string = null;
}
