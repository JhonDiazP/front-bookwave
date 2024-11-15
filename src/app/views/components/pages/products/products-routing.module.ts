import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoriesComponent } from './categories/categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {path: "",component:ListProductsComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: "categories",component: CategoriesComponent},
  {path: "form",component: FormProductsComponent},
  {path: "form/:id",component: FormProductsComponent},
  {path: "view/:id",component: ViewProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
