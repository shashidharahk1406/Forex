import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWhatsappChatComponent } from './customer-whatsapp-chat.component';

describe('CustomerWhatsappChatComponent', () => {
  let component: CustomerWhatsappChatComponent;
  let fixture: ComponentFixture<CustomerWhatsappChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWhatsappChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWhatsappChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
