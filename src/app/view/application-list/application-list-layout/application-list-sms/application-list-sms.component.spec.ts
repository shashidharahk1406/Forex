import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListSmsComponent } from './application-list-sms.component';

describe('ApplicationListSmsComponent', () => {
  let component: ApplicationListSmsComponent;
  let fixture: ComponentFixture<ApplicationListSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
