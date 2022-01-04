import { UserDataService } from 'app/core/services/user-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'app/shared/models/prime_model';
import { Command } from 'protractor';

import { ROUTE_MASTER_GEN } from '../../constants';
import { SubMenuService } from './submenu.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  constructor(
    private router: Router,
    private submenu: SubMenuService,
    private userDataService: UserDataService
  ) {}

  @Input('onleftmenu_com1') closemenu: boolean;

  mian: any[];
  menuLeft2 = true;
  items: MenuItem[];

  open(): any {
    this.menuLeft2 === true
      ? (this.menuLeft2 = false)
      : (this.menuLeft2 = true);
  }

  close(): any {
    let menu2 = document.getElementsByClassName(
      'menu-left-2'
    )[0] as HTMLElement;
    menu2.style.marginLeft = '-200px';
  }

  activate(key: any) {
    let menunumder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let menu = document.querySelectorAll('.cust-btn-menu');
    menu[key].classList.add('menu-activate');
    menunumder.splice(key, 1);
    for (var i = 0; i < menunumder.length; i++) {
      menu[menunumder[i]].classList.remove('menu-activate');
    }
  }

  sidemenu(key: any): any {
    this.activate(key);
    const title = document.getElementById('titleSubMenu');
    let menu2 = document.getElementsByClassName(
      'menu-left-2'
    )[0] as HTMLElement;

    if (key == 0) {
      menu2.style.marginLeft = '-200px';
      this.router.navigateByUrl('/home');
    } else {
      menu2.style.marginLeft = '0px';
      this.mian = this.submenu[key];
      // title.innerHTML = this.submenu[key][0].title;
    }
  }

  ativate(url: any): any {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.split('/');
        this.ativate(url[1]);
      }
    });
  }
  getAccessByLabel(label: string): boolean {
    return this.userDataService.checkCanAccessByLabel(label);
  }
}
