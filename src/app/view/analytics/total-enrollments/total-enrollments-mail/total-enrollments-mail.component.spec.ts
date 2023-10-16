import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnrollmentsMailComponent } from './total-enrollments-mail.component';

describe('TotalEnrollmentsMailComponent', () => {
  let component: TotalEnrollmentsMailComponent;
  let fixture: ComponentFixture<TotalEnrollmentsMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnrollmentsMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEnrollmentsMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
