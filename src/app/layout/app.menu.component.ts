import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Menu } from '../models/menu';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    menu: Menu[] = [];
    mainMenu: Menu[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.menu = JSON.parse(localStorage.getItem('mainMenu') || '[]');
        this.model = [
            {
                label: 'Inicio',
                items: this.menu
            }
        ];
    }
}
