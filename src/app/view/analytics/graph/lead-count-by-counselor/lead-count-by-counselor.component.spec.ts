import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountByCounselorComponent } from './lead-count-by-counselor.component';

describe('LeadCountByCounselorComponent', () => {
  let component: LeadCountByCounselorComponent;
  let fixture: ComponentFixture<LeadCountByCounselorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountByCounselorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountByCounselorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
