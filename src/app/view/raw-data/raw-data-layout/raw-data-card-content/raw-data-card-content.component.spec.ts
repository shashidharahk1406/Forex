import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataCardContentComponent } from './raw-data-card-content.component';

describe('RawDataCardContentComponent', () => {
  let component: RawDataCardContentComponent;
  let fixture: ComponentFixture<RawDataCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
