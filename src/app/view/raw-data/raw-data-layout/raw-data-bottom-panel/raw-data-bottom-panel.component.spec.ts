import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataBottomPanelComponent } from './raw-data-bottom-panel.component';

describe('RawDataBottomPanelComponent', () => {
  let component: RawDataBottomPanelComponent;
  let fixture: ComponentFixture<RawDataBottomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataBottomPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataBottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
