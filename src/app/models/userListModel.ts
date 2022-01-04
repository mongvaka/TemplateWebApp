import { BaseCompanyView } from 'app/core/interfaces/base/baseCompanyView';
export class UserListModel extends BaseCompanyView {
  user_uuid: string = null;
  user_password: string = null;
  user_name: string = null;
  employee_uuid: string = null;
  employee_value: string = null;
  role_value: string = null;
  subscribe_uuid: string = null;
}
