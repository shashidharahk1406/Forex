import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataFollowupComponent } from './raw-data-followup.component';

describe('RawDataFollowupComponent', () => {
  let component: RawDataFollowupComponent;
  let fixture: ComponentFixture<RawDataFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
