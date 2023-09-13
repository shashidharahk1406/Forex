import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginTemplateComponent } from './login-template.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path:'',component:LoginTemplateComponent,children:[
    {path:'loginPage',component:LoginPageComponent},
    {
      path:'',pathMatch:'full',redirectTo:'loginPage'
    },
    {path:'forgotPass',component:LoginTemplateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginTemplateRoutingModule { }
