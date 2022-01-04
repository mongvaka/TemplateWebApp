import { Component, OnInit } from '@angular/core';
import { UIControllerService } from 'app/core/services/uiController.service';
import { ROUTE_MASTER_GEN } from 'app/shared/constants';
import { PageInformationModel } from 'app/shared/models/system_model';
@Component({
  selector: 'app-car-item-page',
  templateUrl: './car-item-page.html',
  styleUrls: ['./car-item-page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class CarItemPage implements OnInit {
  pageInfo: PageInformationModel;
  // masterRoute = this.uiService.getMasterRoute();
  constructor(public uiService: UIControllerService) {}
  ngOnInit(): void {
    this.setPath();
  }
  setPath(): void {
    this.pageInfo = {
      pagePath: ROUTE_MASTER_GEN.CAR,
      servicePath: `/Car`,
    };
  }
}
