import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CollectionLeftSidebarComponent } from "./product/collection/collection-left-sidebar/collection-left-sidebar.component";
import { ProductLeftSidebarComponent } from "./product/product-details/product-left-sidebar/product-left-sidebar.component";
import { ProductNoSidebarComponent } from "./product/product-details/product-no-sidebar/product-no-sidebar.component";
import { SearchComponent } from "./product/search/search.component";
import { BrandProductComponent } from "./product/brand-product/brand-product.component";

// Routes
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "collection/:category",
    component: CollectionLeftSidebarComponent,
  },
  {
    path: "product/:name",
    component: ProductLeftSidebarComponent,
  },
  {
    path: "search/:query",
    component: SearchComponent,
  },
  {
    path: "brand/product/:name",
    component: BrandProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
