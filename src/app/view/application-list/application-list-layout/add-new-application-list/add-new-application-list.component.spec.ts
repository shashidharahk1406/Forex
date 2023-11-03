import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewApplicationListComponent } from './add-new-application-list.component';

describe('AddNewApplicationListComponent', () => {
  let component: AddNewApplicationListComponent;
  let fixture: ComponentFixture<AddNewApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewApplicationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
