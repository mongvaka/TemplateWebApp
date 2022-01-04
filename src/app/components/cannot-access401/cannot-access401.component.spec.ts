import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CannotAccess401Component } from './cannot-access401.component';

describe('CannotAccess401Component', () => {
  let component: CannotAccess401Component;
  let fixture: ComponentFixture<CannotAccess401Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CannotAccess401Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CannotAccess401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
