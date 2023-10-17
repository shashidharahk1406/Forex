import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReEnquiriesSmsDownloadComponent } from './total-re-enquiries-sms-download.component';

describe('TotalReEnquiriesSmsDownloadComponent', () => {
  let component: TotalReEnquiriesSmsDownloadComponent;
  let fixture: ComponentFixture<TotalReEnquiriesSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReEnquiriesSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReEnquiriesSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
