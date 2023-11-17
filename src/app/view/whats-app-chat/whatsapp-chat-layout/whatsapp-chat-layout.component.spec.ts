import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatLayoutComponent } from './whatsapp-chat-layout.component';

describe('WhatsappChatLayoutComponent', () => {
  let component: WhatsappChatLayoutComponent;
  let fixture: ComponentFixture<WhatsappChatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
