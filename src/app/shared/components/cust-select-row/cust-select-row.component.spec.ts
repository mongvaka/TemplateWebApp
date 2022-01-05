import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSelectRowComponent } from './cust-select-row.component';

describe('CustSelectRowComponent', () => {
  let component: CustSelectRowComponent;
  let fixture: ComponentFixture<CustSelectRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustSelectRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustSelectRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
