import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredApplicationCardComponent } from './registered-application-card.component';

describe('RegisteredApplicationCardComponent', () => {
  let component: RegisteredApplicationCardComponent;
  let fixture: ComponentFixture<RegisteredApplicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredApplicationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
