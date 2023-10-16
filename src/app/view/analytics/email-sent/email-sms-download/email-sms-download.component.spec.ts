import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSmsDownloadComponent } from './email-sms-download.component';

describe('EmailSmsDownloadComponent', () => {
  let component: EmailSmsDownloadComponent;
  let fixture: ComponentFixture<EmailSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
