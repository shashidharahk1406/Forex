import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityNameComponent } from './priority-name.component';

describe('PriorityNameComponent', () => {
  let component: PriorityNameComponent;
  let fixture: ComponentFixture<PriorityNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
