import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredApplicationSmsDownloadComponent } from './registered-application-sms-download.component';

describe('RegisteredApplicationSmsDownloadComponent', () => {
  let component: RegisteredApplicationSmsDownloadComponent;
  let fixture: ComponentFixture<RegisteredApplicationSmsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredApplicationSmsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredApplicationSmsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
