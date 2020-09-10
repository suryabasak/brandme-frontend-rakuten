import { Component, OnInit } from "@angular/core";
import { Product } from "../../../shared/classes/product";
import { Category, CategoryProducts } from "../../../shared/classes/category";
import { ProductsService } from "../../../shared/services/products.service";
import { CacheService } from "src/app/shared/services/cache.service";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/shared/services/global.service";
import { UserModel } from "src/app/shared/classes/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public user: UserModel;
  public personalizedProducts: CategoryProducts[] = [];
  public interval: any;
  public products: Product[] = [];
  public fasionAnytime: Product[] = [];
  public eyewears: Product[] = [];
  public headWears: Product[] = [];
  public homeNeeds: Product[] = [];
  public fragrances: Product[] = [];
  public bags: Product[] = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private cacheService: CacheService,
    private globalService: GlobalService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    if (this.user) {
      if (this.user.PersonalizedCategories.length > 0) {
        this.getPersonalizedProduct();
      }
    } else {
      this.getProducts();
    }
  }

  ngOnInit() {
    this.cacheService.getPrimaryCategories();
    this.cacheService.getCategoryMenu();
    this.cacheService.getBrandsWithProduct();
    this.cacheService.getFriendlist();

    if (this.user) {
      if (this.user.PersonalizedCategories.length == 0) {
        this.interval = setInterval(() => {
          if (this.globalService.getShouldPersonalizedPopupClose()) {
            this.user = JSON.parse(
              window.localStorage.getItem("bme-shopping-user-info")
            );
            this.getPersonalizedProduct();
            clearInterval(this.interval);
          }
        }, 1000);
      }
    }
  }

  getPersonalizedProduct() {
    this.productsService
      .getProductsforhomepage(this.user.PersonalizedCategories.toString())
      .subscribe((product: Product[]) => {
        this.products = product;

        this.user.PersonalizedCategories.forEach((ele) => {
          let categoryProduct: CategoryProducts = new CategoryProducts();
          let filteredProducts = this.products.filter((i) => {
            return i.category == ele;
          });
          categoryProduct.category = ele;
          categoryProduct.products = filteredProducts;
          this.personalizedProducts.push(categoryProduct);
        });
      });
  }

  getProducts() {
    let categories = "Tops,Eyewear,Headwear,Home,Fragrance,Bags";
    this.productsService
      .getProductsforhomepage(categories)
      .subscribe((product: Product[]) => {
        this.products = product;

        this.fasionAnytime = this.products.filter((i) => {
          return i.category == "Tops";
        });

        this.eyewears = this.products.filter((i) => {
          return i.category == "Eyewear";
        });

        this.headWears = this.products.filter((i) => {
          return i.category == "Headwear";
        });

        this.homeNeeds = this.products.filter((i) => {
          return i.category == "Home";
        });

        this.fragrances = this.products.filter((i) => {
          return i.category == "Fragrance";
        });

        this.bags = this.products.filter((i) => {
          return i.category == "Bags";
        });
      });
  }

  navigateToList(category: string) {
    var encodedCategory = this.httpParameterEncoder.encodeKey(category);
    this.router.navigateByUrl(`/shop/collection/${encodedCategory}`);
  }
}
