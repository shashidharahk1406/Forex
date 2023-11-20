import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WharsappChatToolbarComponent } from './wharsapp-chat-toolbar.component';

describe('WharsappChatToolbarComponent', () => {
  let component: WharsappChatToolbarComponent;
  let fixture: ComponentFixture<WharsappChatToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WharsappChatToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WharsappChatToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
