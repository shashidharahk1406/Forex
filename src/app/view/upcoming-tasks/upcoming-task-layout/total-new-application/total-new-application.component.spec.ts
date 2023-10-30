import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNewApplicationComponent } from './total-new-application.component';

describe('TotalNewApplicationComponent', () => {
  let component: TotalNewApplicationComponent;
  let fixture: ComponentFixture<TotalNewApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalNewApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalNewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
