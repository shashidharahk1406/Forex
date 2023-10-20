import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTimelineReportComponent } from './application-timeline-report.component';

describe('ApplicationTimelineReportComponent', () => {
  let component: ApplicationTimelineReportComponent;
  let fixture: ComponentFixture<ApplicationTimelineReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationTimelineReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationTimelineReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
