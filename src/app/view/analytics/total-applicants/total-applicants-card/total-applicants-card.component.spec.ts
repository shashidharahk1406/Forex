import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsCardComponent } from './total-applicants-card.component';

describe('TotalApplicantsCardComponent', () => {
  let component: TotalApplicantsCardComponent;
  let fixture: ComponentFixture<TotalApplicantsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApplicantsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApplicantsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
