import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  catalogItems = [
    { title: 'Mecánica automotriz diesel', price: '$200.000', image: 'assets/demo/images/Catalog/image 1.png'},
    { title: 'Mecánica automotriz ford', price: '$198.000', image: 'assets/demo/images/Catalog/image 2.png' },
    { title: 'Mecánica automotriz transmisiones', price: '$500.000', image: 'assets/demo/images/Catalog/image 3.png' },
    { title: 'Mecánica de motos', price: '$80.000', image: 'assets/demo/images/Catalog/image 4.png' },
    { title: 'Mecánica eléctrica', price: '$150.900', image: 'assets/demo/images/Catalog/image 5.png' },
    { title: 'Latonería y pintura', price: '$600.000', image: 'assets/demo/images/Catalog/image 6.png' }
  ];

  totalRecords = this.catalogItems.length;

  // Define el método loadItems para manejar la paginación
  loadItems(event: any) {
    console.log('Página cambiada:', event.page);
  }
}
