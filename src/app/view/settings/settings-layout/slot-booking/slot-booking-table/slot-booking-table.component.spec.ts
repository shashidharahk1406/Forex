import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBookingTableComponent } from './slot-booking-table.component';

describe('SlotBookingTableComponent', () => {
  let component: SlotBookingTableComponent;
  let fixture: ComponentFixture<SlotBookingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotBookingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotBookingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
