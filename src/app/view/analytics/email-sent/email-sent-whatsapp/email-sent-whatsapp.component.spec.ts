import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentWhatsappComponent } from './email-sent-whatsapp.component';

describe('EmailSentWhatsappComponent', () => {
  let component: EmailSentWhatsappComponent;
  let fixture: ComponentFixture<EmailSentWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
