import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupBottomPannelComponent } from './my-followup-bottom-pannel.component';

describe('MyFollowupBottomPannelComponent', () => {
  let component: MyFollowupBottomPannelComponent;
  let fixture: ComponentFixture<MyFollowupBottomPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupBottomPannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupBottomPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
