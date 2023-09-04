import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedLeadsComponent } from './failed-leads.component';

describe('FailedLeadsComponent', () => {
  let component: FailedLeadsComponent;
  let fixture: ComponentFixture<FailedLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedLeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
