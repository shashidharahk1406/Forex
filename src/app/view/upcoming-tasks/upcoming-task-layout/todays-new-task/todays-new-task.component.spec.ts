import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysNewTaskComponent } from './todays-new-task.component';

describe('TodaysNewTaskComponent', () => {
  let component: TodaysNewTaskComponent;
  let fixture: ComponentFixture<TodaysNewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysNewTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
