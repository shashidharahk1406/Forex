import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatCardComponent } from './whatsapp-chat-card.component';

describe('WhatsappChatCardComponent', () => {
  let component: WhatsappChatCardComponent;
  let fixture: ComponentFixture<WhatsappChatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
