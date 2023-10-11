import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataEditComponent } from './raw-data-edit.component';

describe('RawDataEditComponent', () => {
  let component: RawDataEditComponent;
  let fixture: ComponentFixture<RawDataEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
