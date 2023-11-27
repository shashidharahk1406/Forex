import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodesTableComponent } from './coupon-codes-table.component';

describe('CouponCodesTableComponent', () => {
  let component: CouponCodesTableComponent;
  let fixture: ComponentFixture<CouponCodesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponCodesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
