import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLevelOfProgramComponent } from './edit-level-of-program.component';

describe('EditLevelOfProgramComponent', () => {
  let component: EditLevelOfProgramComponent;
  let fixture: ComponentFixture<EditLevelOfProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLevelOfProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLevelOfProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
