import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedActivityComponent } from './missed-activity.component';

describe('MissedActivityComponent', () => {
  let component: MissedActivityComponent;
  let fixture: ComponentFixture<MissedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
