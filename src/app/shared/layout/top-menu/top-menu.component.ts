import { authenService } from 'app/shared/services/authen.service';
import { UserDataService } from 'app/core/services/user-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageKey } from 'app/shared/constants';
import { Url } from 'app/shared/url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  @Output() onlogout = new EventEmitter<boolean>();

  check = true;
  mProfile = false;
  mySubscription: any;

  close(): any {
    this.mProfile = false;
  }

  menuProfile(): any {
    let menu = document.getElementsByClassName('profile')[0] as HTMLElement;
    console.log(menu.classList)
    if (!menu.classList[1]) {
      // menu.classList.add('menu-close');
      this.mProfile = true
 
    } else {
      // menu.classList.remove('menu-close');
      this.mProfile = false
    }
  }

  openFullscreen(): any {
    // tslint:disable-next-line: prefer-const
    let elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      this.check = false;
    } else if (elem.webkitRequestFullscreen) {
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
  closeFullscreen(): any {
    const elem = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (elem.exitFullscreen) {
      elem.exitFullscreen();
      this.check = true;
    } else if (elem.webkitExitFullscreen) {
      elem.webkitExitFullscreen();
    } else if (elem.exitFullscreen) {
      elem.exitFullscreen();
    }
  }

  // tslint:disable-next-line: member-ordering
  username: string;
  // tslint:disable-next-line: member-ordering
  fullname: any;
  // tslint:disable-next-line: member-ordering
  userImage: any;
  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private AuthenService: authenService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    let imgprofile = this.userDataService.getUserImageContent();
    this.username = this.userDataService.getUsername();
    this.fullname = this.userDataService.getFullName();
    let uuid = this.userDataService.getEmployeeUUID();
    this.getUser(uuid, imgprofile);
    if (imgprofile !== 'undefined') {
      this.userImage = this.userDataService.getUserImageContent();
    } else {
      this.userImage = '../../../../assets/images/woman.jpg';
    }

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url;
        if (this.fullname === true && url === '/home') {
          window.location.reload();
        }
      }
    });
  }
  getUser(key: any, imgprofile: any) {
    this.http
      .post(Url.base_url + '/employee/getEmployeeTableById', {
        primaryKey: key,
      })
      .subscribe((data) => {
        console.log(data);
        this.cleckimgprofile(data['gender'], imgprofile);
      });
  }

  cleckimgprofile(key: any, imgprofile: any) {
    if (imgprofile === 'undefined') {
      if (key === 0) {
        this.userImage = '../../../../../assets/images/man.jpeg';
      } else {
        this.userImage = '../../../../../assets/images/woman.jpg';
      }
    } else {
      this.userImage = this.userDataService.getUserImageContent();
    }
  }

  logout(): any {
    localStorage.clear();
    this.onlogout.emit(true);
    this.AuthenService.resetStorage();
    this.router.navigateByUrl('/login');
  }
  profile(): any {
    const userId = this.userDataService.getUserID();
    this.router.navigateByUrl('/administrator/user/' + userId);
  }
}
