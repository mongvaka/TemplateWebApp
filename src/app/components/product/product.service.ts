import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  serviceKey = 'bank_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getProductTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getProductTableList`;
    return this.gateway.list(url, search);
  }
  getProductTableById(id: string): any {
    const url = `${this.servicePath}/getProductTableById`;
    return this.gateway.get(url, id);
  }
  createProductTable(data: any): any {
    const url = `${this.servicePath}/createProductTable`;
    return this.gateway.create(url, data);
  }
  editProductTable(data: any): any {
    const url = `${this.servicePath}/editProductTable`;
    return this.gateway.edit(url, data);
  }
  deleteProductTable(id: string): any {
    const url = `${this.servicePath}/deleteProductTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
