import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVideoCallComponent } from './customer-video-call.component';

describe('CustomerVideoCallComponent', () => {
  let component: CustomerVideoCallComponent;
  let fixture: ComponentFixture<CustomerVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerVideoCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
