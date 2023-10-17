import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTotalVerifiedEnquiriesComponent } from './download-total-verified-enquiries.component';

describe('DownloadTotalVerifiedEnquiriesComponent', () => {
  let component: DownloadTotalVerifiedEnquiriesComponent;
  let fixture: ComponentFixture<DownloadTotalVerifiedEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTotalVerifiedEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTotalVerifiedEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
