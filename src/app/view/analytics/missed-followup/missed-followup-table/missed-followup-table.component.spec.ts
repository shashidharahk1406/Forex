import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFollowupTableComponent } from './missed-followup-table.component';

describe('MissedFollowupTableComponent', () => {
  let component: MissedFollowupTableComponent;
  let fixture: ComponentFixture<MissedFollowupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFollowupTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFollowupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
