import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityNameListComponent } from './priority-name-list.component';

describe('PriorityNameListComponent', () => {
  let component: PriorityNameListComponent;
  let fixture: ComponentFixture<PriorityNameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityNameListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
