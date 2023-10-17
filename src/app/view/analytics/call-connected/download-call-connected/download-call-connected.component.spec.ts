import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCallConnectedComponent } from './download-call-connected.component';

describe('DownloadCallConnectedComponent', () => {
  let component: DownloadCallConnectedComponent;
  let fixture: ComponentFixture<DownloadCallConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCallConnectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadCallConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
