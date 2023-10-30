import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupSortComponent } from './my-followup-sort.component';

describe('MyFollowupSortComponent', () => {
  let component: MyFollowupSortComponent;
  let fixture: ComponentFixture<MyFollowupSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
