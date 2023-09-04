import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowupsComponent } from './my-followups.component';

describe('MyFollowupsComponent', () => {
  let component: MyFollowupsComponent;
  let fixture: ComponentFixture<MyFollowupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFollowupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
