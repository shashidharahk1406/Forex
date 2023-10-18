import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountBySourceComponent } from './application-count-by-source.component';

describe('ApplicationCountBySourceComponent', () => {
  let component: ApplicationCountBySourceComponent;
  let fixture: ComponentFixture<ApplicationCountBySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCountBySourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationCountBySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
