import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustButtonComponent } from './cust-button.component';

describe('CustButtonComponent', () => {
  let component: CustButtonComponent;
  let fixture: ComponentFixture<CustButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
