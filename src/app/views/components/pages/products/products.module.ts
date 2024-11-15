import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ListProductsComponent } from './list-products/list-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormProductsComponent } from './form-products/form-products.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from '../../common/shared.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ CatalogComponent, ListProductsComponent, FormProductsComponent, ViewProductComponent ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CardModule,
    PaginatorModule,
    DataViewModule,
    TagModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    SharedModule,
    CarouselModule,
    AccordionModule,
    RatingModule,
    CalendarModule
  ],
  providers: [MessageService]
})
export class ProductsModule { }
