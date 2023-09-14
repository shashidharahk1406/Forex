import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSourceComponent } from './channel-source.component';

describe('ChannelSourceComponent', () => {
  let component: ChannelSourceComponent;
  let fixture: ComponentFixture<ChannelSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
