import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataBulkSortComponent } from './raw-data-bulk-sort.component';

describe('RawDataBulkSortComponent', () => {
  let component: RawDataBulkSortComponent;
  let fixture: ComponentFixture<RawDataBulkSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataBulkSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataBulkSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
