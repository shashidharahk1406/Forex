import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTotalPaidApplicationsComponent } from './download-total-paid-applications.component';

describe('DownloadTotalPaidApplicationsComponent', () => {
  let component: DownloadTotalPaidApplicationsComponent;
  let fixture: ComponentFixture<DownloadTotalPaidApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTotalPaidApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTotalPaidApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
