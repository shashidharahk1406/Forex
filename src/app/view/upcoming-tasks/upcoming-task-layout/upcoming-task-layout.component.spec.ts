import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTaskLayoutComponent } from './upcoming-task-layout.component';

describe('UpcomingTaskLayoutComponent', () => {
  let component: UpcomingTaskLayoutComponent;
  let fixture: ComponentFixture<UpcomingTaskLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTaskLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingTaskLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
