import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVerifiedEnquiriesWhatsappComponent } from './total-verified-enquiries-whatsapp.component';

describe('TotalVerifiedEnquiriesWhatsappComponent', () => {
  let component: TotalVerifiedEnquiriesWhatsappComponent;
  let fixture: ComponentFixture<TotalVerifiedEnquiriesWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVerifiedEnquiriesWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVerifiedEnquiriesWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
