import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformingCounselorComponent } from './top-performing-counselor.component';

describe('TopPerformingCounselorComponent', () => {
  let component: TopPerformingCounselorComponent;
  let fixture: ComponentFixture<TopPerformingCounselorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPerformingCounselorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPerformingCounselorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
