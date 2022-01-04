import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'app/core/services/user-data.service';
import { Url } from 'app/shared/url';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard-lead',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  departmentUUID = this.userDataService.getUserDepartment();
  EmployeeUUID:any = this.userDataService.getEmployeeUUID();
  tablenone:any = false
  number_rows: any = [
    {
      conditions: [],
      table: 'probation_trans',
      key: '860100 - draft',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'position_trans',
      key: '850100 - draft',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'salary_trans',
      key: '870100 - draft',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'resign',
      key: '84110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'leave_trans',
      key: '41110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'overtime',
      key: '890110 - post',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'transfer_trans',
      key: '880100 - draft',
      depUUID: this.departmentUUID,
    },
    {
      conditions: [],
      table: 'revision_time_trans',
      key: '900100 - draft',
      depUUID: this.departmentUUID,
    },
  ];

  constructor(
    private http: HttpClient,
    private service: DashboardService,
    private userDataService: UserDataService
  ) {
    this.getlist();
  }

  //อาจเปลี่ยนดึงข้อมูล real time

  getlist() {
    if(this.EmployeeUUID == "null"){
      this.tablenone = true
    }else{
      for (let i = 0; i < this.number_rows.length; i++) {
        this.http
          .post(Url.base_url + '/dashboard/numblerows', this.number_rows[i])
          .subscribe((data) => {
            this.number_rows[i].value = data;
            console.log(data);
          });
      }
    }
  }

  ngOnInit(): void {}
}
