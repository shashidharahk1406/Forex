import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAppChatComponent } from './whats-app-chat.component';

describe('WhatsAppChatComponent', () => {
  let component: WhatsAppChatComponent;
  let fixture: ComponentFixture<WhatsAppChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsAppChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsAppChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
