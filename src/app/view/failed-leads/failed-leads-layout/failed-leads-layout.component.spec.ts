import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedLeadsLayoutComponent } from './failed-leads-layout.component';

describe('FailedLeadsLayoutComponent', () => {
  let component: FailedLeadsLayoutComponent;
  let fixture: ComponentFixture<FailedLeadsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedLeadsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedLeadsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
