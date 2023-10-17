import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsWhatsappComponent } from './total-applicants-whatsapp.component';

describe('TotalApplicantsWhatsappComponent', () => {
  let component: TotalApplicantsWhatsappComponent;
  let fixture: ComponentFixture<TotalApplicantsWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApplicantsWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApplicantsWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
