import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysPendingFollowupsComponent } from './todays-pending-followups.component';

describe('TodaysPendingFollowupsComponent', () => {
  let component: TodaysPendingFollowupsComponent;
  let fixture: ComponentFixture<TodaysPendingFollowupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysPendingFollowupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysPendingFollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
