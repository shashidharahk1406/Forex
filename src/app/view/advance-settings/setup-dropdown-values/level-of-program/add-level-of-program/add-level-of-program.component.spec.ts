import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelOfProgramComponent } from './add-level-of-program.component';

describe('AddLevelOfProgramComponent', () => {
  let component: AddLevelOfProgramComponent;
  let fixture: ComponentFixture<AddLevelOfProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevelOfProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLevelOfProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
