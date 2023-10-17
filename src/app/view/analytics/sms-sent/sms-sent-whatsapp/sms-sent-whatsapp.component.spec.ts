import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentWhatsappComponent } from './sms-sent-whatsapp.component';

describe('SmsSentWhatsappComponent', () => {
  let component: SmsSentWhatsappComponent;
  let fixture: ComponentFixture<SmsSentWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSentWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSentWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
