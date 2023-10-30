import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNewLeadComponent } from './total-new-lead.component';

describe('TotalNewLeadComponent', () => {
  let component: TotalNewLeadComponent;
  let fixture: ComponentFixture<TotalNewLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalNewLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalNewLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
