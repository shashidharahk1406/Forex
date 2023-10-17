import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredApplicationTableComponent } from './registered-application-table.component';

describe('RegisteredApplicationTableComponent', () => {
  let component: RegisteredApplicationTableComponent;
  let fixture: ComponentFixture<RegisteredApplicationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredApplicationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredApplicationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
