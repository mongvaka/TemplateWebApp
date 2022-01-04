import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisButtonComponent } from './cust-button.component';

describe('KisButtonComponent', () => {
  let component: KisButtonComponent;
  let fixture: ComponentFixture<KisButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KisButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
