import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { WhatsappComponent } from './whatsapp.component';
import { CreateNonEnterpriseTemplateComponent } from './create-non-enterprise-template/create-non-enterprise-template.component';
import { CreateEnterpriseTemplateComponent } from './create-enterprise-template/create-enterprise-template.component';


const routes: Routes = [
      {
        path:'', component:WhatsappComponent, children:[
          {
            path:'whatsappTemplates', component: TemplateListComponent
          },
          { path:'', redirectTo:'whatsappTemplates', pathMatch:'full'},
          {
            path:'createNonEnterpriseTemplate', component: CreateNonEnterpriseTemplateComponent
          },
          {
            path:'createEnterpriseTemplate', component:CreateEnterpriseTemplateComponent
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsappRoutingModule { }
