import { Component, OnInit } from '@angular/core';
import { ServicesBusiness } from 'src/app/business-controller/services.service';
import { Service } from 'src/app/models/service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {

  public currentPage: number = 1;
  public totalPages: number = 0;
  public maxPagesToShow: number = 5;
  public pages: number[] = [];
  public storageUrl: string = environment.storage;
  public search: string = '';

  public services: Service[] = [];

  constructor(
    private serviceBusiness: ServicesBusiness
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(page: number = 1) {

    let params: any = {
      'search': this.search || '',
      'page': page,
    };

    this.serviceBusiness.getServices(params).then((services: any) => {
      this.services = services.data;
      this.currentPage = services.current_page;
      this.totalPages = services.last_page;
      this.updatePages();
    }).catch(error => {

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

  onSearchChange() {
    this.getServices();
  }
}
