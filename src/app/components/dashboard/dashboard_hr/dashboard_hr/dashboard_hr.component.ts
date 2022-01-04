import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'app/core/services/user-data.service';
import { Url } from 'app/shared/url';
import { Observable } from 'rxjs';
import { DashboardHrService } from '../dashboard_hr.service';
@Component({
  selector: 'app-dashboard-hr',
  templateUrl: './dashboard_hr.component.html',
  styleUrls: ['./dashboard_hr.component.scss'],
})
export class DashboardHrComponent implements OnInit {
  departmentUUID = this.userDataService.getUserDepartment();
  EmployeeUUID:any = this.userDataService.getEmployeeUUID();
  tablenone:any = false
  number_rows: any = [
    {
      conditions: [],
      table: 'probation_trans',
      key: '860110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'position_trans',
      key: '850110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'salary_trans',
      key: '870110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'resign',
      key: '84130 - approved',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'leave_trans',
      key: '41140 - approved',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'overtime',
      key: '890130 - approved',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'transfer_trans',
      key: '880110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'revision_time_trans',
      key: '900110 - post',
      depUUID: this.departmentUUID,
    },
  ];

  constructor(
    private http: HttpClient,
    private service: DashboardHrService,
    private userDataService: UserDataService
  ) {
    this.getlist();
    let reface = () => {
      this.getlist();
      if (true) {
        setTimeout(reface, 1200000);
      }
    };
    reface();
  }

  //อาจเปลี่ยนดึงข้อมูล real time

  getlist() {
    if(this.EmployeeUUID == "null"){
      this.tablenone = true
    }else{
      for (let i = 0; i < this.number_rows.length; i++) {
      this.http
        .post(Url.base_url + '/dashboard/numblerows/hr', this.number_rows[i])
        .subscribe((data) => {
          this.number_rows[i].value = data;
        });
      }
    }
    
  }

  ngOnInit(): void {}
}
