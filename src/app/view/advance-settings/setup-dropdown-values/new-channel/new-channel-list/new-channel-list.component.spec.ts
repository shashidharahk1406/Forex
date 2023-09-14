import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChannelListComponent } from './new-channel-list.component';

describe('NewChannelListComponent', () => {
  let component: NewChannelListComponent;
  let fixture: ComponentFixture<NewChannelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChannelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
