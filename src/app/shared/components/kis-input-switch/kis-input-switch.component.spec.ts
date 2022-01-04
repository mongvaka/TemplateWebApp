import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisInputSwitchComponent } from './cust-input-switch.component';

describe('KisInputSwitchComponent', () => {
  let component: KisInputSwitchComponent;
  let fixture: ComponentFixture<KisInputSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KisInputSwitchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
