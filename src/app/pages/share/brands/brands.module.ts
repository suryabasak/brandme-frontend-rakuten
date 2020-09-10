import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { BrandsRoutingModule } from './brands-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [BrandsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    SharedModule,
    BrandsRoutingModule,
    NgxMasonryModule,    
  ] 
})
export class BrandsModule { }
