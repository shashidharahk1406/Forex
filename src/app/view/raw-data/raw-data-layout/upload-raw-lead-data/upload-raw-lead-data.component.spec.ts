import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRawLeadDataComponent } from './upload-raw-lead-data.component';

describe('UploadRawLeadDataComponent', () => {
  let component: UploadRawLeadDataComponent;
  let fixture: ComponentFixture<UploadRawLeadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRawLeadDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRawLeadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
