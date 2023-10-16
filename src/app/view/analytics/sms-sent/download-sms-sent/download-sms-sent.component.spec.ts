import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSmsSentComponent } from './download-sms-sent.component';

describe('DownloadSmsSentComponent', () => {
  let component: DownloadSmsSentComponent;
  let fixture: ComponentFixture<DownloadSmsSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadSmsSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadSmsSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
