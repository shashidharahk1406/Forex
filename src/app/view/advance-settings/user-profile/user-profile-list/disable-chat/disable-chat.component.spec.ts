import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableChatComponent } from './disable-chat.component';

describe('DisableChatComponent', () => {
  let component: DisableChatComponent;
  let fixture: ComponentFixture<DisableChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
