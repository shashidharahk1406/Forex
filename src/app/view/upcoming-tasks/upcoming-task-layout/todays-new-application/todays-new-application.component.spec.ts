import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysNewApplicationComponent } from './todays-new-application.component';

describe('TodaysNewApplicationComponent', () => {
  let component: TodaysNewApplicationComponent;
  let fixture: ComponentFixture<TodaysNewApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysNewApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysNewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
