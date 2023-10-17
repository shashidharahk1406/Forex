import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVerifiedEnquiriesCardComponent } from './total-verified-enquiries-card.component';

describe('TotalVerifiedEnquiriesCardComponent', () => {
  let component: TotalVerifiedEnquiriesCardComponent;
  let fixture: ComponentFixture<TotalVerifiedEnquiriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVerifiedEnquiriesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVerifiedEnquiriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
