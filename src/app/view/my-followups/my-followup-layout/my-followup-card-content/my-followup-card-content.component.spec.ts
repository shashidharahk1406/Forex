import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupCardContentComponent } from './my-followup-card-content.component';

describe('MyFollowupCardContentComponent', () => {
  let component: MyFollowupCardContentComponent;
  let fixture: ComponentFixture<MyFollowupCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
