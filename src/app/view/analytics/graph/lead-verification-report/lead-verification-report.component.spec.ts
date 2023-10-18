import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadVerificationReportComponent } from './lead-verification-report.component';

describe('LeadVerificationReportComponent', () => {
  let component: LeadVerificationReportComponent;
  let fixture: ComponentFixture<LeadVerificationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadVerificationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadVerificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
