import { LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './views/components/notfound/notfound.component';
import { ProductService } from './views/service/product.service';
import { CountryService } from './views/service/country.service';
import { CustomerService } from './views/service/customer.service';
import { EventService } from './views/service/event.service';
import { IconService } from './views/service/icon.service';
import { NodeService } from './views/service/node.service';
import { PhotoService } from './views/service/photo.service';

//New TODO mydasboard
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator'; 
import { CardModule } from 'primeng/card';

import locateEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(locateEs, 'es');

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent 
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        CommonModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,  
        FormsModule,
        PaginatorModule,  
        CardModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es', useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
