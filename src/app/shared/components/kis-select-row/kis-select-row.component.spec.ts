import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisSelectRowComponent } from './cust-select-row.component';

describe('KisSelectRowComponent', () => {
  let component: KisSelectRowComponent;
  let fixture: ComponentFixture<KisSelectRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KisSelectRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisSelectRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
