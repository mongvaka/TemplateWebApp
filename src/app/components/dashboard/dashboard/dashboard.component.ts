import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Url } from 'app/shared/url';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  number_rows: any = [
    {
      conditions: [],
      table: 'probation_trans',
      key: '860110 - post',
    },
    {
      conditions: [],
      table: 'position_trans',
      key: '850110 - post',
    },
    {
      conditions: [],
      table: 'salary_trans',
      key: '870110 - post',
    },
    {
      conditions: [],
      table: 'resign',
      key: '84130 - approved',
    },
  ];

  constructor(private http: HttpClient, private service: DashboardService) {
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
    for (let i = 0; i < this.number_rows.length; i++) {
      this.http
        .post(Url.base_url + '/dashboard/numblerows', this.number_rows[i])
        .subscribe((data) => {
          this.number_rows[i].value = data;
        });
    }
  }

  ngOnInit(): void {}
}
