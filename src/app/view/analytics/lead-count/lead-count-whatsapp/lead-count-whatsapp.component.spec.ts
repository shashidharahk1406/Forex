import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountWhatsappComponent } from './lead-count-whatsapp.component';

describe('LeadCountWhatsappComponent', () => {
  let component: LeadCountWhatsappComponent;
  let fixture: ComponentFixture<LeadCountWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
