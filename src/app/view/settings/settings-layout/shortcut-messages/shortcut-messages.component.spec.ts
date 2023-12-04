import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutMessagesComponent } from './shortcut-messages.component';

describe('ShortcutMessagesComponent', () => {
  let component: ShortcutMessagesComponent;
  let fixture: ComponentFixture<ShortcutMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortcutMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
