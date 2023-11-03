import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListLayoutComponent } from './application-list-layout.component';

describe('ApplicationListLayoutComponent', () => {
  let component: ApplicationListLayoutComponent;
  let fixture: ComponentFixture<ApplicationListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
