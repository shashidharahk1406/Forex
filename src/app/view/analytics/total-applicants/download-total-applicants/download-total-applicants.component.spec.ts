import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTotalApplicantsComponent } from './download-total-applicants.component';

describe('DownloadTotalApplicantsComponent', () => {
  let component: DownloadTotalApplicantsComponent;
  let fixture: ComponentFixture<DownloadTotalApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTotalApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTotalApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
