import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReEnquiriesWhatsappComponent } from './total-re-enquiries-whatsapp.component';

describe('TotalReEnquiriesWhatsappComponent', () => {
  let component: TotalReEnquiriesWhatsappComponent;
  let fixture: ComponentFixture<TotalReEnquiriesWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReEnquiriesWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReEnquiriesWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
