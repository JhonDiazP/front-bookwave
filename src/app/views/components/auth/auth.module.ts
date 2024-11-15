import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { DialogModule } from 'primeng/dialog';
import { FormRegisterComponent } from './form-register/form-register.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    declarations: [FormRegisterComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        DialogModule,
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
    exports: [FormRegisterComponent]
})
export class AuthModule { }
