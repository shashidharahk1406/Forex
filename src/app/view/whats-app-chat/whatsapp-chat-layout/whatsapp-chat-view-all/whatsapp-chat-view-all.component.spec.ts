import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatViewAllComponent } from './whatsapp-chat-view-all.component';

describe('WhatsappChatViewAllComponent', () => {
  let component: WhatsappChatViewAllComponent;
  let fixture: ComponentFixture<WhatsappChatViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
