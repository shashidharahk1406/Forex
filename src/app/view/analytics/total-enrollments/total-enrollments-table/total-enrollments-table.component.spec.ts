import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnrollmentsTableComponent } from './total-enrollments-table.component';

describe('TotalEnrollmentsTableComponent', () => {
  let component: TotalEnrollmentsTableComponent;
  let fixture: ComponentFixture<TotalEnrollmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnrollmentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEnrollmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
