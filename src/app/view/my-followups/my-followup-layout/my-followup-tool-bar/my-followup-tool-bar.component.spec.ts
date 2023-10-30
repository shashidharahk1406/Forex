import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupToolBarComponent } from './my-followup-tool-bar.component';

describe('MyFollowupToolBarComponent', () => {
  let component: MyFollowupToolBarComponent;
  let fixture: ComponentFixture<MyFollowupToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupToolBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
