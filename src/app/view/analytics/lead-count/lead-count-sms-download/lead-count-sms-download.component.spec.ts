import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountSmsDownloadComponent } from './lead-count-sms-download.component';

describe('LeadCountSmsDownloadComponent', () => {
  let component: LeadCountSmsDownloadComponent;
  let fixture: ComponentFixture<LeadCountSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
