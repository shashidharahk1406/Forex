import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatCallComponent } from './whatsapp-chat-call.component';

describe('WhatsappChatCallComponent', () => {
  let component: WhatsappChatCallComponent;
  let fixture: ComponentFixture<WhatsappChatCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
