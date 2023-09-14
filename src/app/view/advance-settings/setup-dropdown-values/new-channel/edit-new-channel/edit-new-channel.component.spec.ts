import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewChannelComponent } from './edit-new-channel.component';

describe('EditNewChannelComponent', () => {
  let component: EditNewChannelComponent;
  let fixture: ComponentFixture<EditNewChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
