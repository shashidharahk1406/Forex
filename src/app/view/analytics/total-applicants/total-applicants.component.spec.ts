import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsComponent } from './total-applicants.component';

describe('TotalApplicantsComponent', () => {
  let component: TotalApplicantsComponent;
  let fixture: ComponentFixture<TotalApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
