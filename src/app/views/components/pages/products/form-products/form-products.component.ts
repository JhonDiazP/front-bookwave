import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { CategoryService } from 'src/app/business-controller/category.service';
import { ServicesBusiness } from 'src/app/business-controller/services.service';
import { TerritoriesService } from 'src/app/business-controller/territories.service';
import { Category } from 'src/app/models/category';
import { Country } from 'src/app/models/territories/country';
import { Municipality } from 'src/app/models/territories/municipality';
import { Region } from 'src/app/models/territories/region';
import { ProductService } from 'src/app/views/service/product.service';

@Component({
  selector: 'app-form-products',
  standalone: false,
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.scss'
})
export class FormProductsComponent implements OnInit {

  public productForm: FormGroup;
  public categories: Category[] = [];
  public countries: Country[] = [];
  public regions: Region[] = [];
  public municipalities: Municipality[] = [];
  public serviceId: string = this.route.snapshot.params['id'];
  public items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      route: '../'
    },
    {
      label: 'Crear servicio',
      route: '../form/'
    }
  ];
  public previewImages: { [key: string]: string | ArrayBuffer | null | undefined } = {
    photo_principal: null,
    photo_one: null,
    photo_two: null,
  };

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private territoriesService: TerritoriesService,
    private productService: ServicesBusiness,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category_id: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      municipality_id: ['', Validators.required],
      photo_principal: ['', Validators.required],
      photo_one: [''],
      photo_two: [''],
    })
  }

  ngOnInit(): void {
    if(this.serviceId){
      this.getServiceById();
      this.items = [
        {
          icon: 'pi pi-home',
          route: '../../'
        },
        {
          label: 'Editar Usuario',
          route: '../form/'+this.serviceId
        }
      ]
    }
    this.getCategories();
    this.getCountries();
  }

  getCategories() {
    this.categoryService.getCategories().then(categories => {
      this.categories = categories;
    }).catch(err => {
      console.log(err);
    });
  }

  uploadDocument(event: any, imageType: string = 'photo_principal'): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get(imageType)?.setValue(file);
    }
  }

  previewImage(event: Event, imageType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.previewImages[imageType] = e.target?.result;
      };

      reader.readAsDataURL(file);
    }
    this.uploadDocument(event, imageType);
  }

  submitForm() {
    if (this.productForm.valid) {
      const formData = new FormData();
      for (const key in this.productForm.value) {
        formData.append(key, this.productForm.value[key]);
      }
      this.productService.Save(formData).then(x => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: x.message, key: 'tst' });
        this.productForm.reset();
      }).catch(err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err, key: 'tst' });
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Advertencia', detail: 'Por favor, llena todos los campos', key: 'tst' });
    }
  }

  getCountries(){
    this.territoriesService.getCountry().then(countries => {
      this.countries = countries;
    }).catch(x => {

    })
  }

  getRegionsByCountry(event: DropdownChangeEvent){
    console.log(event.value);
    this.territoriesService.getRegion({country_id: event.value}).then(regions => {
      this.regions = regions;
    }).catch(x => {

    })
  }

  getMunicipalitiesByRegion(event: DropdownChangeEvent){
    this.territoriesService.getMunicipalities({region_id: event.value}).then(municipalities => {
      this.municipalities = municipalities;
    }).catch(x => {

    })
  }

  getServiceById(){
    this.productService.gerServiceById(this.serviceId).then(service => {
      this.productForm.patchValue(service);
    }).catch(x => {

    })
  }
}
