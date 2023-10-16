import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFollowupComponent } from './missed-followup.component';

describe('MissedFollowupComponent', () => {
  let component: MissedFollowupComponent;
  let fixture: ComponentFixture<MissedFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
