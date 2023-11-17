import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseUserComponent } from './pause-user.component';

describe('PauseUserComponent', () => {
  let component: PauseUserComponent;
  let fixture: ComponentFixture<PauseUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
