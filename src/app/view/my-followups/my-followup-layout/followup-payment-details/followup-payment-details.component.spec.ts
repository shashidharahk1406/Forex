import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupPaymentDetailsComponent } from './followup-payment-details.component';

describe('FollowupPaymentDetailsComponent', () => {
  let component: FollowupPaymentDetailsComponent;
  let fixture: ComponentFixture<FollowupPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
