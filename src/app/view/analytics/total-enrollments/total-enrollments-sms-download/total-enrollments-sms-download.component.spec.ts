import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnrollmentsSmsDownloadComponent } from './total-enrollments-sms-download.component';

describe('TotalEnrollmentsSmsDownloadComponent', () => {
  let component: TotalEnrollmentsSmsDownloadComponent;
  let fixture: ComponentFixture<TotalEnrollmentsSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnrollmentsSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEnrollmentsSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
