import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisToastComponent } from './cust-toast.component';

describe('KisToastComponent', () => {
  let component: KisToastComponent;
  let fixture: ComponentFixture<KisToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KisToastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
