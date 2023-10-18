import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountByCounselorComponent } from './application-count-by-counselor.component';

describe('ApplicationCountByCounselorComponent', () => {
  let component: ApplicationCountByCounselorComponent;
  let fixture: ComponentFixture<ApplicationCountByCounselorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCountByCounselorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationCountByCounselorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
