import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import { MenuService } from "../app.menu.service";
import { UserRoleService } from 'src/app/business-controller/user-role.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth.service';
import { ItemRolePermissionService } from 'src/app/business-controller/item-role-permission.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    @Input() minimal: boolean = false;

    scales: number[] = [12, 13, 14, 15, 16];

    roles: Role[] = [];

    roleId: number = 0;

    user: User = this.authService.GetUser();

    constructor(
        public layoutService: LayoutService, 
        public menuService: MenuService,
        private userRoleService: UserRoleService,
        private authService: AuthService,
        private itemRolePermissionService: ItemRolePermissionService,
    ) { }

    async ngOnInit() {
        // await this.getRolesByUserId();
        this.roleId = this.authService.GetRole();
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.menuMode = _val;
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    getRolesByUserId(){
        this.userRoleService.getRolesByUserId(this.user.id ?? 1)
        .then(x => {
            this.roles = x;
        }).catch(x => {
            console.log(x);
        })
    }

    async onRoleChange(role: number){
        this.authService.ChangeRole(role.toString());
        await this.itemRolePermissionService.GetCollection(this.authService.GetRole());
        window.location.reload();
    }
}
