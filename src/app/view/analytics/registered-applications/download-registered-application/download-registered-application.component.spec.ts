import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRegisteredApplicationComponent } from './download-registered-application.component';

describe('DownloadRegisteredApplicationComponent', () => {
  let component: DownloadRegisteredApplicationComponent;
  let fixture: ComponentFixture<DownloadRegisteredApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadRegisteredApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadRegisteredApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
