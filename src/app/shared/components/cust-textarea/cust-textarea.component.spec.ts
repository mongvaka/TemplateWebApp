import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTextareaComponent } from './cust-textarea.component';

describe('CustTextareaComponent', () => {
  let component: CustTextareaComponent;
  let fixture: ComponentFixture<CustTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustTextareaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
