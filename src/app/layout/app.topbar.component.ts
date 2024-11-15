import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { reduce } from 'rxjs';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    items!: MenuItem[];

    tieredItems!: MenuItem[];

    roles: Role[] = [];

    login: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public router: Router
    ) { }

    ngOnInit() {
        
        this.login = this.authService.isLoggedIn;
        
        this.tieredItems = [
            {
                label: '',
                icon: 'pi pi-user text-white',
                items: [
                    {
                        label: 'Cerrar sesión',
                        icon: 'pi pi-sign-out',
                        command: () => this.logOut()
                    }
                ]
            }
        ]
    }

    logOut(){
        this.authService.LogOut();
        this.router.navigateByUrl('/auth/login');
    }

    changeRole(){

    }


}
