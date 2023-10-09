import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadUploadComponent } from './lead-upload.component';

describe('LeadUploadComponent', () => {
  let component: LeadUploadComponent;
  let fixture: ComponentFixture<LeadUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
