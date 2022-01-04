import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  template: '',
})
// tslint:disable-next-line:component-class-suffix
export declare abstract class BaseInterface
  implements OnInit, AfterViewInit, OnDestroy
{
  ngOnInit(): void;
  ngOnDestroy(): void;
  ngAfterViewInit(): void;
  checkPageMode(): void;
  checkAccessMode(): void;
}
