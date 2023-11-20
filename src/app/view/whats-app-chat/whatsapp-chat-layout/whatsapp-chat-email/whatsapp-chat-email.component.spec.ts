import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatEmailComponent } from './whatsapp-chat-email.component';

describe('WhatsappChatEmailComponent', () => {
  let component: WhatsappChatEmailComponent;
  let fixture: ComponentFixture<WhatsappChatEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
