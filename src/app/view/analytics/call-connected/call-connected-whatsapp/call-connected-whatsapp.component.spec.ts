import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConnectedWhatsappComponent } from './call-connected-whatsapp.component';

describe('CallConnectedWhatsappComponent', () => {
  let component: CallConnectedWhatsappComponent;
  let fixture: ComponentFixture<CallConnectedWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConnectedWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConnectedWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
