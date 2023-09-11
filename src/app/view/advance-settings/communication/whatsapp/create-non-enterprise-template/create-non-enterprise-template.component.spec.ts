import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNonEnterpriseTemplateComponent } from './create-non-enterprise-template.component';

describe('CreateNonEnterpriseTemplateComponent', () => {
  let component: CreateNonEnterpriseTemplateComponent;
  let fixture: ComponentFixture<CreateNonEnterpriseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNonEnterpriseTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNonEnterpriseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
