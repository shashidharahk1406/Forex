import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLeadListComponent } from './download-lead-list.component';

describe('DownloadLeadListComponent', () => {
  let component: DownloadLeadListComponent;
  let fixture: ComponentFixture<DownloadLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadLeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
