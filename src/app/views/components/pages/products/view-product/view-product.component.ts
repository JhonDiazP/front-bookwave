import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { ServicesBusiness } from 'src/app/business-controller/services.service';
import { UserService } from 'src/app/business-controller/user.service';
import { ImageService } from 'src/app/models/image-service';
import { ServiceObject } from 'src/app/models/main/service-object';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product',
  standalone: false,
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {

  public serviceId: string = this.route.snapshot.params['id'];
  public service!: Service;
  public storage: string = environment.storage;
  public imagesService: ImageService[] = [];
  public user!: User;
  public userId: string = this.authService.GetUser().id;
  public date: any;
  public items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      route: '../../catalog'
    },
    {
      label: 'Crear servicio',
      route: '../'+this.serviceId
    }
  ];

  constructor(
    private serviceBusiness: ServicesBusiness,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getService();
  }

  getService(): void {
    this.serviceBusiness.gerServiceById(this.serviceId).then((service: Service) => {
      this.service = service;
      this.userService.gerUserById(service.user_id).then((user: User) => {
        this.user = user;
      });
      this.imagesService = service.image_services || [];
    });
  }

  checkAvailability(): void {
    let hour = this.getFormattedTime();
    if(this.date){
      this.serviceBusiness.hireService({user_id: this.userId, service_id: this.service.id, date: hour}).then((x: ServiceObject) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: x.message, key: 'tst' });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un horario', key: 'tst' });
    }
  }

  getFormattedTime(): string {
    const date = new Date(this.date);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
