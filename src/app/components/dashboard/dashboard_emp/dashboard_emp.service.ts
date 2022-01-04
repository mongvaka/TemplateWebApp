import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewayService } from 'app/core/services/gateway.service';
import { ToDoListEmpModel } from 'app/models';
import { PageInformationModel, SearchParameter } from 'app/shared/models/system_model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardEmpService {
  serviceKey = 'employee_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}

  getToDoListByEmployeeId(id: string): Observable <any> {
    const url = `${this.servicePath}/employee/getToDoListByEmployeeId`;
    return this.gateway.get(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
