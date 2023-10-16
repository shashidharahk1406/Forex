import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTotalPaidSmsDownloadComponent } from './download-total-paid-sms-download.component';

describe('DownloadTotalPaidSmsDownloadComponent', () => {
  let component: DownloadTotalPaidSmsDownloadComponent;
  let fixture: ComponentFixture<DownloadTotalPaidSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTotalPaidSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTotalPaidSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
