import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTotalReEnquiriesComponent } from './download-total-re-enquiries.component';

describe('DownloadTotalReEnquiriesComponent', () => {
  let component: DownloadTotalReEnquiriesComponent;
  let fixture: ComponentFixture<DownloadTotalReEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTotalReEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTotalReEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
