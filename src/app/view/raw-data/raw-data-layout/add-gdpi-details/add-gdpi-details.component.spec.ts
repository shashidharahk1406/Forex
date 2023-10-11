import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGdpiDetailsComponent } from './add-gdpi-details.component';

describe('AddGdpiDetailsComponent', () => {
  let component: AddGdpiDetailsComponent;
  let fixture: ComponentFixture<AddGdpiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGdpiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGdpiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
