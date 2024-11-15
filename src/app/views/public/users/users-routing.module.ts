import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUsersComponent } from './form-users/form-users.component';

const routes: Routes = [
  {path: 'form', component: FormUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
