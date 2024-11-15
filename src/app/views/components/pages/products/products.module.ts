import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [ CatalogComponent ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CardModule,
    PaginatorModule
  ]
})
export class ProductsModule { }
