import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationComponent } from './communication.component';

const routes: Routes = [
  {
    path:'', component:CommunicationComponent, children:[
      {
        path:'whatsappTemplate', loadChildren:()=> import('./whatsapp/whatsapp.module').then(m =>m.WhatsappModule)
      },
      {
        path:'', redirectTo:'whatsappTemplate', pathMatch:'full'
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationRoutingModule { }
