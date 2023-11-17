import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatWhatsappComponent } from './whatsapp-chat-whatsapp.component';

describe('WhatsappChatWhatsappComponent', () => {
  let component: WhatsappChatWhatsappComponent;
  let fixture: ComponentFixture<WhatsappChatWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
