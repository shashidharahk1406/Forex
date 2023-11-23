import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedLeadsUploadComponent } from './failed-leads-upload.component';

describe('FailedLeadsUploadComponent', () => {
  let component: FailedLeadsUploadComponent;
  let fixture: ComponentFixture<FailedLeadsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedLeadsUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedLeadsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
