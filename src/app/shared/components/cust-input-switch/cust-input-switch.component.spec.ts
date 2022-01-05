import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustInputSwitchComponent } from './cust-input-switch.component';

describe('CustInputSwitchComponent', () => {
  let component: CustInputSwitchComponent;
  let fixture: ComponentFixture<CustInputSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustInputSwitchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
