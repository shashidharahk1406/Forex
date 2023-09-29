import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSMSComponent } from './lead-sms.component';

describe('LeadSMSComponent', () => {
  let component: LeadSMSComponent;
  let fixture: ComponentFixture<LeadSMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadSMSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
