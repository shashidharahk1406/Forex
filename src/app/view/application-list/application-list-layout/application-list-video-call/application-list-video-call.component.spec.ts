import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListVideoCallComponent } from './application-list-video-call.component';

describe('ApplicationListVideoCallComponent', () => {
  let component: ApplicationListVideoCallComponent;
  let fixture: ComponentFixture<ApplicationListVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListVideoCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
