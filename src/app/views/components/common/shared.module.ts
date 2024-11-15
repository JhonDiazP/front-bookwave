import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BaseTableComponent } from './base-table/base-table.component';

@NgModule({
  declarations: [BaseTableComponent],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [BaseTableComponent]
})
export class SharedModule  { }
