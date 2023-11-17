import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatSmsComponent } from './whatsapp-chat-sms.component';

describe('WhatsappChatSmsComponent', () => {
  let component: WhatsappChatSmsComponent;
  let fixture: ComponentFixture<WhatsappChatSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
