import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShortcutMessageComponent } from './add-shortcut-message.component';

describe('AddShortcutMessageComponent', () => {
  let component: AddShortcutMessageComponent;
  let fixture: ComponentFixture<AddShortcutMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShortcutMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShortcutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
