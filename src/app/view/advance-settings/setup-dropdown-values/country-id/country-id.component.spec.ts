import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryIdComponent } from './country-id.component';

describe('CountryIdComponent', () => {
  let component: CountryIdComponent;
  let fixture: ComponentFixture<CountryIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
