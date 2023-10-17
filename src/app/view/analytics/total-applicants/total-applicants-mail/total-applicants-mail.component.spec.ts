import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsMailComponent } from './total-applicants-mail.component';

describe('TotalApplicantsMailComponent', () => {
  let component: TotalApplicantsMailComponent;
  let fixture: ComponentFixture<TotalApplicantsMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApplicantsMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApplicantsMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
