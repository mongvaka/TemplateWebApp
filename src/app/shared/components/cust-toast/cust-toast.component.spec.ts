import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustToastComponent } from './cust-toast.component';

describe('CustToastComponent', () => {
  let component: CustToastComponent;
  let fixture: ComponentFixture<CustToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustToastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
