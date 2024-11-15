import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../common/shared.module';
import { ButtonModule } from 'primeng/button';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormUsersComponent } from './form-users/form-users.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckPermsDirective } from 'src/app/directives/check-perms.directive';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ListUsersComponent, FormUsersComponent, CheckPermsDirective],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
    PanelModule,
    CardModule,
    ToastModule,
    DividerModule,
    InputNumberModule,
    FileUploadModule,
    MultiSelectModule,
    TableModule,
    TooltipModule
  ],
  exports: [ CheckPermsDirective ],
  providers: [ MessageService ]
})
export class UsersModule { }
