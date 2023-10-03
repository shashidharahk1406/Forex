import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadVideoCallComponent } from './lead-video-call.component';

describe('LeadVideoCallComponent', () => {
  let component: LeadVideoCallComponent;
  let fixture: ComponentFixture<LeadVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadVideoCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
