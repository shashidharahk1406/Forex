import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTotalEnrollmentsComponent } from './download-total-enrollments.component';

describe('DownloadTotalEnrollmentsComponent', () => {
  let component: DownloadTotalEnrollmentsComponent;
  let fixture: ComponentFixture<DownloadTotalEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTotalEnrollmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTotalEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
