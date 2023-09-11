import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnterpriseTemplateComponent } from './create-enterprise-template.component';

describe('CreateEnterpriseTemplateComponent', () => {
  let component: CreateEnterpriseTemplateComponent;
  let fixture: ComponentFixture<CreateEnterpriseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnterpriseTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEnterpriseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
