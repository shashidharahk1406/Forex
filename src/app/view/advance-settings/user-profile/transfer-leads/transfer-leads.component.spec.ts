import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferLeadsComponent } from './transfer-leads.component';

describe('TransferLeadsComponent', () => {
  let component: TransferLeadsComponent;
  let fixture: ComponentFixture<TransferLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferLeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
