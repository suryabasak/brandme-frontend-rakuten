import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/shared/services/products.service";
import { GlobalService } from "src/app/shared/services/global.service";
import { Product, searchResult } from "src/app/shared/classes/product";
import { UserModel } from "src/app/shared/classes/user";

@Component({
  selector: "app-style-product",
  templateUrl: "./style-product.component.html",
  styleUrls: ["./style-product.component.scss"],
})
export class StyleProductComponent implements OnInit {
  public user: UserModel;
  public products: Product[] = [];
  public interval: any;

  constructor(
    private productsService: ProductsService,
    private globalService: GlobalService
  ) {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    if (this.user) {
      if (this.user.PersonalizedCategories.length > 0) {
        this.getRecommendedProduct();
      }
    }
  }

  ngOnInit() {
    if (this.user) {
      if (this.user.PersonalizedCategories.length == 0) {
        this.interval = setInterval(() => {
          if (this.globalService.getShouldPersonalizedPopupClose()) {
            this.user = JSON.parse(
              window.localStorage.getItem("bme-shopping-user-info")
            );
            this.getRecommendedProduct();
            clearInterval(this.interval);
          }
        }, 1000);
      }
    }
  }

  getRecommendedProduct() {
    this.productsService.getPersonalizedProduct(this.user).subscribe((res) => {
      if (res) {
        res.forEach((ele) => {
          if (ele.Product.length > 0) {
            this.products.push(ele.Product[0]);
          }
        });
      }
    });
  }

  // related slider config
  public styleSliderConfig = {
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 586,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
