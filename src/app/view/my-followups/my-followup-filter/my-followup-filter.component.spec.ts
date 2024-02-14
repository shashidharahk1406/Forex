import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupFilterComponent } from './my-followup-filter.component';

describe('MyFollowupFilterComponent', () => {
  let component: MyFollowupFilterComponent;
  let fixture: ComponentFixture<MyFollowupFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
