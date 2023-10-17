import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaidApplicationsWhatsappComponent } from './total-paid-applications-whatsapp.component';

describe('TotalPaidApplicationsWhatsappComponent', () => {
  let component: TotalPaidApplicationsWhatsappComponent;
  let fixture: ComponentFixture<TotalPaidApplicationsWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPaidApplicationsWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPaidApplicationsWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
