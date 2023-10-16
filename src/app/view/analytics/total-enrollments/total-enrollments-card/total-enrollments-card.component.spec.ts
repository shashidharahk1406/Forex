import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnrollmentsCardComponent } from './total-enrollments-card.component';

describe('TotalEnrollmentsCardComponent', () => {
  let component: TotalEnrollmentsCardComponent;
  let fixture: ComponentFixture<TotalEnrollmentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnrollmentsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEnrollmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
