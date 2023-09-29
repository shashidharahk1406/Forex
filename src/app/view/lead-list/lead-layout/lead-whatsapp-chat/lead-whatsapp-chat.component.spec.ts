import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadWhatsappChatComponent } from './lead-whatsapp-chat.component';

describe('LeadWhatsappChatComponent', () => {
  let component: LeadWhatsappChatComponent;
  let fixture: ComponentFixture<LeadWhatsappChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadWhatsappChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadWhatsappChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
