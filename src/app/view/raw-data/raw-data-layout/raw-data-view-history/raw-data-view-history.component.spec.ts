import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataViewHistoryComponent } from './raw-data-view-history.component';

describe('RawDataViewHistoryComponent', () => {
  let component: RawDataViewHistoryComponent;
  let fixture: ComponentFixture<RawDataViewHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataViewHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataViewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
