import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatBottomPanelComponent } from './whatsapp-chat-bottom-panel.component';

describe('WhatsappChatBottomPanelComponent', () => {
  let component: WhatsappChatBottomPanelComponent;
  let fixture: ComponentFixture<WhatsappChatBottomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatBottomPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatBottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
