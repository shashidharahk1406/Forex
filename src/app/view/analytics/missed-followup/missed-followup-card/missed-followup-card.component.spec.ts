import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFollowupCardComponent } from './missed-followup-card.component';

describe('MissedFollowupCardComponent', () => {
  let component: MissedFollowupCardComponent;
  let fixture: ComponentFixture<MissedFollowupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFollowupCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFollowupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
