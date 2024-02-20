import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupEmailComponent } from './followup-email.component';

describe('FollowupEmailComponent', () => {
  let component: FollowupEmailComponent;
  let fixture: ComponentFixture<FollowupEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
