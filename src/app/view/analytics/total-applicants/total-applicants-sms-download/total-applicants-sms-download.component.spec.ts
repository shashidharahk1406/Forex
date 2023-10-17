import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsSmsDownloadComponent } from './total-applicants-sms-download.component';

describe('TotalApplicantsSmsDownloadComponent', () => {
  let component: TotalApplicantsSmsDownloadComponent;
  let fixture: ComponentFixture<TotalApplicantsSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApplicantsSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApplicantsSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
