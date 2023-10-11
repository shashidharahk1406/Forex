import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataToolbarComponent } from './raw-data-toolbar.component';

describe('RawDataToolbarComponent', () => {
  let component: RawDataToolbarComponent;
  let fixture: ComponentFixture<RawDataToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
