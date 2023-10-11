import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRawDataComponent } from './add-new-raw-data.component';

describe('AddNewRawDataComponent', () => {
  let component: AddNewRawDataComponent;
  let fixture: ComponentFixture<AddNewRawDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRawDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
