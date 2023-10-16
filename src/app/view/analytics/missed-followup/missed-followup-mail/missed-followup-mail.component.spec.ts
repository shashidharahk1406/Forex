import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFollowupMailComponent } from './missed-followup-mail.component';

describe('MissedFollowupMailComponent', () => {
  let component: MissedFollowupMailComponent;
  let fixture: ComponentFixture<MissedFollowupMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFollowupMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFollowupMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
