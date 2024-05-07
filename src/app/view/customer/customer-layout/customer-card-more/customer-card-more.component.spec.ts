import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardMoreComponent } from './customer-card-more.component';

describe('CustomerCardMoreComponent', () => {
  let component: CustomerCardMoreComponent;
  let fixture: ComponentFixture<CustomerCardMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCardMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCardMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
