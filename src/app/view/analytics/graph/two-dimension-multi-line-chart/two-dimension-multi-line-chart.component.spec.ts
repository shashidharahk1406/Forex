import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDimensionMultiLineChartComponent } from './two-dimension-multi-line-chart.component';

describe('TwoDimensionMultiLineChartComponent', () => {
  let component: TwoDimensionMultiLineChartComponent;
  let fixture: ComponentFixture<TwoDimensionMultiLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoDimensionMultiLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDimensionMultiLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
