import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadApplicationListComponent } from './upload-application-list.component';

describe('UploadApplicationListComponent', () => {
  let component: UploadApplicationListComponent;
  let fixture: ComponentFixture<UploadApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadApplicationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
