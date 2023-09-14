import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryIdListComponent } from './country-id-list.component';

describe('CountryIdListComponent', () => {
  let component: CountryIdListComponent;
  let fixture: ComponentFixture<CountryIdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryIdListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryIdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
