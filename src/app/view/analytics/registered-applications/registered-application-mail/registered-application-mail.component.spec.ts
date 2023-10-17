import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredApplicationMailComponent } from './registered-application-mail.component';

describe('RegisteredApplicationMailComponent', () => {
  let component: RegisteredApplicationMailComponent;
  let fixture: ComponentFixture<RegisteredApplicationMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredApplicationMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredApplicationMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
