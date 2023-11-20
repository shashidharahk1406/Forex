import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatEditComponent } from './whatsapp-chat-edit.component';

describe('WhatsappChatEditComponent', () => {
  let component: WhatsappChatEditComponent;
  let fixture: ComponentFixture<WhatsappChatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
