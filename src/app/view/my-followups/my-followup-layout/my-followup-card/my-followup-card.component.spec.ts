import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupCardComponent } from './my-followup-card.component';

describe('MyFollowupCardComponent', () => {
  let component: MyFollowupCardComponent;
  let fixture: ComponentFixture<MyFollowupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
