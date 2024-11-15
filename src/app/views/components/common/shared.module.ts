import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BaseTableComponent } from './base-table/base-table.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [BaseTableComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    TableModule,
    BreadcrumbModule
  ],
  exports: [BaseTableComponent, BreadcrumbComponent]
})
export class SharedModule  { }
