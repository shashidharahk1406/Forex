import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryIdComponent } from './edit-country-id.component';

describe('EditCountryIdComponent', () => {
  let component: EditCountryIdComponent;
  let fixture: ComponentFixture<EditCountryIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCountryIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCountryIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
