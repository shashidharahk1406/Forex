import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentCardComponent } from './email-sent-card.component';

describe('EmailSentCardComponent', () => {
  let component: EmailSentCardComponent;
  let fixture: ComponentFixture<EmailSentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
