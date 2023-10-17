import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsListComponent } from './total-applicants-list.component';

describe('TotalApplicantsListComponent', () => {
  let component: TotalApplicantsListComponent;
  let fixture: ComponentFixture<TotalApplicantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApplicantsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApplicantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
