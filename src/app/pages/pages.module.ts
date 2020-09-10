import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { SlickCarouselModule } from "ngx-slick-carousel"; 
import { IsotopeModule } from "ngx-isotope";

import { AboutUsComponent } from "./about-us/about-us.component";
import { CollectionComponent } from "./collection/collection.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from "./faq/faq.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SlickCarouselModule,
    IsotopeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AboutUsComponent,
    CollectionComponent,
    ContactComponent,
    FaqComponent
  ],
})
export class PagesModule {}
