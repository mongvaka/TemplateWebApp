import { Component, OnInit } from '@angular/core';
import { UIControllerService } from 'app/core/services/uiController.service';
import { ColumnType, SortType } from 'app/shared/constants';
import { ROUTE_INFO_GEN, ROUTE_MASTER_GEN } from 'app/shared/constants/constant_gen';
import {
  ColumnModel,
  OptionModel,
  PageInformationModel,
} from 'app/shared/models/system_model/miscellaneous_model';
@Component({
  selector: 'app-job-list-page',
  templateUrl: './job-list-page.html',
  styleUrls: ['./job-list-page.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class JobListPage implements OnInit {
  pageInfo: PageInformationModel;
  option: OptionModel;
  constructor(public uiService: UIControllerService) {}
  ngOnInit(): void {
    this.setOption();
    this.setPath();
  }
  setOption(): void {
    this.option = new OptionModel();
    this.option.key = 'job_uuid';
    const columns: ColumnModel[] = [];
    this.option.columns = columns;
  }
  setPath(): void {
    this.pageInfo = {
      pagePath: ROUTE_MASTER_GEN.JOB,
      servicePath: '/Job',
    };
  }
}
