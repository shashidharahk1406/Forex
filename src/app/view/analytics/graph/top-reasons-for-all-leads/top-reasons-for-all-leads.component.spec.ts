import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReasonsForAllLeadsComponent } from './top-reasons-for-all-leads.component';

describe('TopReasonsForAllLeadsComponent', () => {
  let component: TopReasonsForAllLeadsComponent;
  let fixture: ComponentFixture<TopReasonsForAllLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopReasonsForAllLeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopReasonsForAllLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
