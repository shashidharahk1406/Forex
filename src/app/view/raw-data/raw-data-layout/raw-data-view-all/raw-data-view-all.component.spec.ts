import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataViewAllComponent } from './raw-data-view-all.component';

describe('RawDataViewAllComponent', () => {
  let component: RawDataViewAllComponent;
  let fixture: ComponentFixture<RawDataViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
