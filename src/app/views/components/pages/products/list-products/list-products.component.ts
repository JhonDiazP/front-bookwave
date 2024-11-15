import { Component, OnInit } from '@angular/core';
import { ServicesBusiness } from 'src/app/business-controller/services.service';
import { Columns } from 'src/app/models/common/table/columns';
import { Settings } from 'src/app/models/common/table/settings';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {

  public services: Service[] = [];
  public currentPage: number = 1;
  public totalPages: number = 0;
  public maxPagesToShow: number = 5;
  public pages: number[] = [];

  public settings: Settings = new Settings({
    name: {
      title: 'Nombre',
      type: 'string'
    },
    description: {
      title: 'Descripción',
      type: 'string'
    },
    category: {
      title: 'Categoría',
      type: 'string',
      valuePrepareFunction: (value: any, rowData: any) => {
        return rowData.category.name
      }
    },
    price: {
      title: 'Precio',
      type: 'string',
    },
    date: {
      title: 'Creación',
      type: 'date'
    }
  },['name', 'description', 'category', 'price']);

  constructor(
    private serviceBusiness: ServicesBusiness
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(page: number = 1) {
    let params: any = {
      // 'search': this.searchValue || '',
      'page': page,
    };

    this.serviceBusiness.getServices(params).then((services:any) => {
        this.services = services.data;
        this.currentPage = services.current_page;
        this.totalPages = services.last_page;
        this.updatePages();
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPageChange(page: number) {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.getServices(page);
    }
  }

  updatePages() {
    const half = Math.floor(this.maxPagesToShow / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxPagesToShow - 1);

    if (end - start < this.maxPagesToShow) {
      start = Math.max(1, end - this.maxPagesToShow + 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }
}
