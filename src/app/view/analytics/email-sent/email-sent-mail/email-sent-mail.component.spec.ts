import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentMailComponent } from './email-sent-mail.component';

describe('EmailSentMailComponent', () => {
  let component: EmailSentMailComponent;
  let fixture: ComponentFixture<EmailSentMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
