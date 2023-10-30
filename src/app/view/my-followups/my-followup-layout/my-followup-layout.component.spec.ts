import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupLayoutComponent } from './my-followup-layout.component';

describe('MyFollowupLayoutComponent', () => {
  let component: MyFollowupLayoutComponent;
  let fixture: ComponentFixture<MyFollowupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
