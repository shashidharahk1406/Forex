import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPendingFollowupsComponent } from './total-pending-followups.component';

describe('TotalPendingFollowupsComponent', () => {
  let component: TotalPendingFollowupsComponent;
  let fixture: ComponentFixture<TotalPendingFollowupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPendingFollowupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPendingFollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
