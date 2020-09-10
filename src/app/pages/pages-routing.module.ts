import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutUsComponent } from "./about-us/about-us.component";
import { SearchComponent } from "./shop/product/search/search.component";
import { CollectionComponent } from "./collection/collection.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from "./faq/faq.component";


const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "shop", pathMatch: "full" },
      {
        path: "shop",
        loadChildren: () =>
          import("./shop/shop.module").then((m) => m.ShopModule),
      },
      {
        path: "share",
        loadChildren: () =>
          import("./share/share.module").then((m) => m.ShareModule),
      },
      {
        path: "me",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },      
      {
        path: "about-us",
        component: AboutUsComponent,
      },
      {
        path: "collection",
        component: CollectionComponent,
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "faq",
        component: FaqComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
