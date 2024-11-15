import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UsersRoutingModule } from './users-routing.module';
import { FormUsersComponent } from './form-users/form-users.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    FormUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AutoCompleteModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
    PanelModule,
    CardModule,
    ToastModule,
    DividerModule,
    InputNumberModule,
    FileUploadModule
  ],
  providers: [MessageService]
})
export class UsersModule { }
