import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDropdownValuesComponent } from './setup-dropdown-values.component';

describe('SetupDropdownValuesComponent', () => {
  let component: SetupDropdownValuesComponent;
  let fixture: ComponentFixture<SetupDropdownValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDropdownValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupDropdownValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
