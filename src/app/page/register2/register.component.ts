import { BankItemModel } from '../../models/bankItemModel';
import { LoggingModel } from '../../shared/models/system_model/miscellaneous_model';
import { Message } from 'primeng/api';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { authenService } from 'app/shared/services/authen.service';
import { MessagingService } from 'app/shared/services/config/messaging.service';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouteConfigLoadStart,
  ActivationStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { BaseItemComponent } from 'app/core/components/base-item/base-item.component';
import { ButtonConfig, InputTextConfig } from 'app/shared/config/format.config';
import { RegisterModel } from 'app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() onlogins = new EventEmitter<boolean>();
  loadding = false;
  public buttonConfig = ButtonConfig.SAVE;
  cardRegister = false;
  model: RegisterModel;
  public DEFAULT_INPUTTEXT = InputTextConfig.DEFAULT_INPUTTEXT;

  message: string;
  background: string;
  icon: string;
  user: any = {
    username: '',
    password: '',
  };
  error: string[];

  constructor(
    private router: Router,
    private AuthenService: authenService,
    public messagingService: MessagingService
  ) {
    this.model = new RegisterModel();
  }

  host(key: any) {
    let filterAdmin = document.getElementsByClassName(
      'comtai-filterAdmin'
    )[0] as HTMLElement;
    if (key === 'localhost') {
      this.message = 'Developer testing';
      this.background =
        'https://cdn.pixabay.com/photo/2016/07/19/04/40/moon-1527501_960_720.jpg';
      this.icon = 'fas fa-user-secret';
    } else if (key === 'dev-icefac.kraois.com') {
      this.message = 'Users testing';
      this.background =
        'https://cdn.pixabay.com/photo/2021/08/07/14/36/modern-6528732_960_720.png';
      this.icon = 'fas fa-user';
    } else {
      this.message = '';
      this.background = '/assets/images/login.png';
      this.icon = '';
      filterAdmin.style.display = 'none';
    }
  }

  ngOnInit(): void {
    this.host(location.hostname);
  }

  onChange(event: Event): void {
    const password = document.querySelector('#password') as HTMLInputElement;
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }

  login(): any {
    // this.loadding = true;

    this.onlogins.emit(false);
    const isLogin = this.AuthenService.login(
      this.user.username,
      this.user.password
    );
  }

  register() {
    this.cardRegister = true;
  }
  close() {
    this.cardRegister = false;
  }
  download() {
    this.AuthenService.downloadDoc();
  }
}
