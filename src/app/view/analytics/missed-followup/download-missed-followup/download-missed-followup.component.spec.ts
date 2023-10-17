import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMissedFollowupComponent } from './download-missed-followup.component';

describe('DownloadMissedFollowupComponent', () => {
  let component: DownloadMissedFollowupComponent;
  let fixture: ComponentFixture<DownloadMissedFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadMissedFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadMissedFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
