import { AccessMode } from 'app/shared/constants';

export class BaseCompanyView {
  public create_by: string = null;
  public create_date: string = null;
  public update_by: string = null;
  public update_date: string = null;
  public is_active: boolean = false;
  public branch_uuid: string = null;
  public rowAuthorize?: AccessMode = AccessMode.noAccess;
  public uuidStamp?: string = null;
  public company_uuid?: string = null;
}
