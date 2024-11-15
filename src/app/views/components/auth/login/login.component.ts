import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { ItemRolePermissionService } from 'src/app/business-controller/item-role-permission.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(5.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(5.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password!: string;

    msgs: Message[] = [];

    visible: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private itemRolePermission: ItemRolePermissionService
    ) { }

    form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    ngOnInit(): void {

    }

    login(){
        if(!this.form.invalid){
            this.authService.Login(this.form.value.email, this.form.value.password).then(x => {
                this.authService.GetUserById(x.data.user_id).then(async user =>{
                    this.authService.SaveUser(user.user);
                    await this.itemRolePermission.GetCollection(user.user.roles[0].id);
                    this.router.navigate(['pages/products/catalog']);
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Iniciando sesión.'});
                });
            }).catch(x => {
                this.messageService.add({ key: 'tst', severity: 'error', summary: 'Usuario y/o contraseña incorrectos.'});
            })
        }else{
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Usuario y/o contraseña incorrectos.'});
        }
    }

    loginGoogle(){
        this.authService.Login("jhonever2017@hotmail.com", "Soporte2023+").then(x => {  
            this.authService.GetUserById(x.data.user_id).then(async user =>{
                this.authService.SaveUser(user.user);
                await this.itemRolePermission.GetCollection(user.user.roles[0].id);
                this.router.navigate(['pages/products/catalog']);
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Iniciando sesión.'});
            });
        }).catch(x => {

        })
    }

    test(){
        if(!this.form.invalid){
            this.messageService.add({  key: 'tst', severity: 'error', summary: 'Usuario y/o contraseña incorrectos.'});
        }else {
            this.messageService.add({ key : 'tst', severity: 'error', summary: 'Usuario y/o contraseña incorrectos.'});
        }
    }

    showDialog() {
        this.visible = true;
    }
}
