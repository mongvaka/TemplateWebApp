import { AccessMode } from 'app/shared/constants/enum_system';

export class ViewBaseEntity {
  public rowAuthorize?: AccessMode = AccessMode.noAccess;
  public create_by: string = null;
  public create_date: string = null;
  public update_by: string = null;
  public update_date: string = null;
  public is_active: boolean = false;
  public branch_uuid: string = null;
}
