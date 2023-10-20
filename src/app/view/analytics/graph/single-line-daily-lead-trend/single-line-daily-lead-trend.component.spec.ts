import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineDailyLeadTrendComponent } from './single-line-daily-lead-trend.component';

describe('SingleLineDailyLeadTrendComponent', () => {
  let component: SingleLineDailyLeadTrendComponent;
  let fixture: ComponentFixture<SingleLineDailyLeadTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLineDailyLeadTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLineDailyLeadTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
