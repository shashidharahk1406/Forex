import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListViewAllComponent } from './application-list-view-all.component';

describe('ApplicationListViewAllComponent', () => {
  let component: ApplicationListViewAllComponent;
  let fixture: ComponentFixture<ApplicationListViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
