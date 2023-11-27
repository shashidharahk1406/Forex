import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutMessagesTableComponent } from './shortcut-messages-table.component';

describe('ShortcutMessagesTableComponent', () => {
  let component: ShortcutMessagesTableComponent;
  let fixture: ComponentFixture<ShortcutMessagesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutMessagesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortcutMessagesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
