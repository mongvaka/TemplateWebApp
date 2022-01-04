import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisStytemComponent } from './cust-stytem.component';

describe('KisStytemComponent', () => {
  let component: KisStytemComponent;
  let fixture: ComponentFixture<KisStytemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KisStytemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisStytemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
