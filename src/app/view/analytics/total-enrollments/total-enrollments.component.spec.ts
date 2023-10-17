import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnrollmentsComponent } from './total-enrollments.component';

describe('TotalEnrollmentsComponent', () => {
  let component: TotalEnrollmentsComponent;
  let fixture: ComponentFixture<TotalEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnrollmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
