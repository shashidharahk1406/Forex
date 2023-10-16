import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadEmailSentComponent } from './download-email-sent.component';

describe('DownloadEmailSentComponent', () => {
  let component: DownloadEmailSentComponent;
  let fixture: ComponentFixture<DownloadEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadEmailSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
