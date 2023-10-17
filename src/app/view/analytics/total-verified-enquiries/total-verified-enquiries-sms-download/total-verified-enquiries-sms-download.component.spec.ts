import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVerifiedEnquiriesSmsDownloadComponent } from './total-verified-enquiries-sms-download.component';

describe('TotalVerifiedEnquiriesSmsDownloadComponent', () => {
  let component: TotalVerifiedEnquiriesSmsDownloadComponent;
  let fixture: ComponentFixture<TotalVerifiedEnquiriesSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVerifiedEnquiriesSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVerifiedEnquiriesSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
