import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormUsersComponent } from './form-users/form-users.component';

const routes: Routes = [
  {path: 'list-user', component: ListUsersComponent},
  {path: 'form-user', component: FormUsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
