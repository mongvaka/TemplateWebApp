import { Uuid } from 'app/shared/functions/value.function';

import { Url } from './../../../../shared/url';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'app/core/services/user-data.service';
import { ToDoListEmpModel } from 'app/models';
import { Observable } from 'rxjs';
import { DashboardEmpService } from '../dashboard_emp.service';

@Component({
	selector: 'app-dashboard-emp',
	templateUrl: './dashboard_emp.component.html',
	styleUrls: ['./dashboard_emp.component.scss'],
})
export class DashboardEmpComponent implements OnInit {
	imgcover =
		'https://cdn.pixabay.com/photo/2021/10/30/08/28/scooter-6753797_960_720.jpg';
	profileimg: any;
	// modelList: any;
	fullname: any;
	username: any;
	firstname: any;
	lastname: any;
	email: any;
	remark: any;
	uuid: any;
	EmployeeUUID:any = this.userDataService.getEmployeeUUID();

	mobel: any[] =[
		{
			leave_trans_type_name:"ลากิจ(หักเงิน)",
			leave_date:"",
			days:"",
			hours:""
	
		},
		{
			leave_trans_type_name:"ลากิจ",
			leave_date:"",
			days:"",
			hours:""
	
		},
		{
			leave_trans_type_name:"ลาป่วย",
			leave_date:"",
			days:"",
			hours:""
	
		},
		{
			leave_trans_type_name:"ลาพักร้อน",
			leave_date:"",
			days:"",
			hours:""
	
		},
	]


	constructor(
		private service: DashboardEmpService,
		private userDataService: UserDataService,
		private router: Router,
		private http: HttpClient
	) {
		
	}

	settime(uuid:any){
		this.service.getToDoListByEmployeeId(uuid).subscribe((result) => {
			let  employee = result.employee_list
		    employee.forEach((result: { leave_date: { days: number; hours: number } }, index:any ) => {
				console.log(result.leave_date)
				if(!result.leave_date){
					this.mobel[index].days = "0";
					this.mobel[index].hours = "0";
				}
				result.leave_date.days 
				? this.mobel[index].days = result.leave_date.days
				: this.mobel[index].days = "0";
		    	result.leave_date.hours
				? this.mobel[index].hours = result.leave_date.hours
				: this.mobel[index].hours = "0";
			});
		});
	}

	ngOnInit(): void {
		if(this.EmployeeUUID == "null"){
            this.firstname = "ยังไม่ผูกกับ"
			this.lastname = "พนังงาน";
			this.email =  "ชื่อผู้ใช้นี้ยังไม่ผูกกับ พนังงาน"
			this.remark =  "ชื่อผู้ใช้นี้ยังไม่ผูกกับ พนังงาน"
			this.uuid =  "ชื่อผู้ใช้นี้ยังไม่ผูกกับ พนังงาน"
			this.username = "ยังไม่ผูกกับ พนังงาน"

		}else{
			let imgprofile = this.userDataService.getUserImageContent();
			this.username = this.userDataService.getUsername();
			this.fullname = this.userDataService.getFullName();
			let uuid = this.userDataService.getEmployeeUUID();
			this.settime(uuid)
			this.getUser(uuid, imgprofile);
		}
		
		
	}

	getUser(key: any, imgprofile: any) {
		this.http
			.post(Url.base_url + '/employee/getEmployeeTableById', {
				primaryKey: key,
			})
			.subscribe((data) => {
				
				
					this.firstname = data['first_name'];
					this.lastname = data['last_name'];
					this.email = data['email'];
					this.remark = data['remark'];
					this.uuid = data['employee_uuid'];
					this.cleckimgprofile(data['gender'], imgprofile);
				
			}
		);
	}

	cleckimgprofile(key: any, imgprofile: any) {
		if (imgprofile === 'undefined') {
			if (key === 0) {
				this.profileimg = '../../../../../assets/images/man.jpeg';
			} else {
				this.profileimg = '../../../../../assets/images/woman.jpg';
			}
		} else {
			this.profileimg = this.userDataService.getUserImageContent();
		}
	}

	viewprofile(uuid: any) {
	
		this.router.navigate(['hrm/dashboard/todolist-emp/', uuid]);
	}
}
