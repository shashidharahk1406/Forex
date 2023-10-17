import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredApplicationsComponent } from './registered-applications.component';

describe('RegisteredApplicationsComponent', () => {
  let component: RegisteredApplicationsComponent;
  let fixture: ComponentFixture<RegisteredApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
