import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupVideocallComponent } from './followup-videocall.component';

describe('FollowupVideocallComponent', () => {
  let component: FollowupVideocallComponent;
  let fixture: ComponentFixture<FollowupVideocallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupVideocallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupVideocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
