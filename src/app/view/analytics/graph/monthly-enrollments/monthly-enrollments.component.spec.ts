import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEnrollmentsComponent } from './monthly-enrollments.component';

describe('MonthlyEnrollmentsComponent', () => {
  let component: MonthlyEnrollmentsComponent;
  let fixture: ComponentFixture<MonthlyEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyEnrollmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
