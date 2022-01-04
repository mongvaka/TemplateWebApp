import { Component, OnInit } from '@angular/core';
import { UIControllerService } from 'app/core/services/uiController.service';
import { ROUTE_MASTER_GEN } from 'app/shared/constants';
import { ColumnModel, OptionModel, PageInformationModel } from 'app/shared/models/system_model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  pageInfo: PageInformationModel;
  option: OptionModel;
  constructor(public uiService: UIControllerService) {}

  ngOnInit(): void {
    this.setOption();
    this.setPath();
  }
  setOption(): void {
    this.option = new OptionModel();
    this.option.key = 'employee_uuid';
    const columns: ColumnModel[] = [];
    this.option.columns = columns;
  }
  setPath(): void {
    this.pageInfo = {
      pagePath: ROUTE_MASTER_GEN.TO_DO_LIST_EMP,
      servicePath: '/Todolist-emp',
    };
  }
}
