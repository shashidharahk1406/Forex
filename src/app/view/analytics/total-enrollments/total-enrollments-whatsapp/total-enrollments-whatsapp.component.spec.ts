import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnrollmentsWhatsappComponent } from './total-enrollments-whatsapp.component';

describe('TotalEnrollmentsWhatsappComponent', () => {
  let component: TotalEnrollmentsWhatsappComponent;
  let fixture: ComponentFixture<TotalEnrollmentsWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnrollmentsWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEnrollmentsWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
