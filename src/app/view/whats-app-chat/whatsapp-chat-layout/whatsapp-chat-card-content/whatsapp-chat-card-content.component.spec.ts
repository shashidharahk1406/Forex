import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatCardContentComponent } from './whatsapp-chat-card-content.component';

describe('WhatsappChatCardContentComponent', () => {
  let component: WhatsappChatCardContentComponent;
  let fixture: ComponentFixture<WhatsappChatCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
