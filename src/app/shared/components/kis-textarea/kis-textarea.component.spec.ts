import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisTextareaComponent } from './cust-textarea.component';

describe('KisTextareaComponent', () => {
  let component: KisTextareaComponent;
  let fixture: ComponentFixture<KisTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KisTextareaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
