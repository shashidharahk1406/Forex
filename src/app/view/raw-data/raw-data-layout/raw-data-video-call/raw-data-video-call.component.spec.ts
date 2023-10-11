import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataVideoCallComponent } from './raw-data-video-call.component';

describe('RawDataVideoCallComponent', () => {
  let component: RawDataVideoCallComponent;
  let fixture: ComponentFixture<RawDataVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataVideoCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
