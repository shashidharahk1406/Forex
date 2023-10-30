import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysMissedFollowupComponent } from './todays-missed-followup.component';

describe('TodaysMissedFollowupComponent', () => {
  let component: TodaysMissedFollowupComponent;
  let fixture: ComponentFixture<TodaysMissedFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysMissedFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysMissedFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
