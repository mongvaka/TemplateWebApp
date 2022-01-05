import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustStytemComponent } from './cust-stytem.component';

describe('CustStytemComponent', () => {
  let component: CustStytemComponent;
  let fixture: ComponentFixture<CustStytemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustStytemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustStytemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
