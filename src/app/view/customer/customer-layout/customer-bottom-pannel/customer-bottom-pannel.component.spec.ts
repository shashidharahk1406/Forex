import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBottomPannelComponent } from './customer-bottom-pannel.component';

describe('CustomerBottomPannelComponent', () => {
  let component: CustomerBottomPannelComponent;
  let fixture: ComponentFixture<CustomerBottomPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBottomPannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBottomPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
