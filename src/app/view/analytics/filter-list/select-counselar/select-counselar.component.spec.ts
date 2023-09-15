import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCounselarComponent } from './select-counselar.component';

describe('SelectCounselarComponent', () => {
  let component: SelectCounselarComponent;
  let fixture: ComponentFixture<SelectCounselarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCounselarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCounselarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
