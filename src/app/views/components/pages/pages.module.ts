import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from '../common/shared.module';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule,
        UsersModule,
        PaginatorModule
    ],
    exports: []
})
export class PagesModule { }
