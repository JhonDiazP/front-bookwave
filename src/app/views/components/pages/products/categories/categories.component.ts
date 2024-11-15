import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule], 
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  ngOnInit() {
    this.loadCategories(); 
  }

  loadCategories() {
    
    this.categories = [
      { name: 'Jardinería', image: 'assets/demo/images/Catalog/image 1.png' },
      { name: 'Limpieza', image: 'assets/demo/images/Catalog/image 2.png' },
      { name: 'Mantenimiento', image: 'assets/demo/images/Catalog/image 3.png' },
      { name: 'Mecánica', image: 'assets/demo/images/Catalog/image 4.png' },
      { name: 'Mudanza', image: 'assets/demo/images/Catalog/image 5.png' },
      { name: 'Otros', image: 'assets/demo/images/Catalog/image 6.png' },
    ];
  }
}
