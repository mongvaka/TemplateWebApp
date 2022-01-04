import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowMenuService {
  public isPresentingLeftMenu: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isPresentingTopMenu: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isPresentingHamberger: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isPresentingFooter: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor() {}
}
