import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentTableComponent } from './email-sent-table.component';

describe('EmailSentTableComponent', () => {
  let component: EmailSentTableComponent;
  let fixture: ComponentFixture<EmailSentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
