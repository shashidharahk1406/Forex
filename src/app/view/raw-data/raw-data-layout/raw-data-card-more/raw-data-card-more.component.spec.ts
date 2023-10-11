import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataCardMoreComponent } from './raw-data-card-more.component';

describe('RawDataCardMoreComponent', () => {
  let component: RawDataCardMoreComponent;
  let fixture: ComponentFixture<RawDataCardMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataCardMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataCardMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
