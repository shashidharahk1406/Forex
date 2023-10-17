import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReEnquiriesCardComponent } from './total-re-enquiries-card.component';

describe('TotalReEnquiriesCardComponent', () => {
  let component: TotalReEnquiriesCardComponent;
  let fixture: ComponentFixture<TotalReEnquiriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReEnquiriesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReEnquiriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
