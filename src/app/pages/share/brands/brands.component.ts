import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CacheService } from "src/app/shared/services/cache.service";
import { Brand } from "src/app/shared/classes/brand";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";


@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.scss"],
})
export class BrandsComponent implements OnInit {
  public brands: Brand[];


  constructor(
    private router: Router,
    public cacheService: CacheService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    // this.getBrandsByProduct();
  }

  ngOnInit() {
    this.getBrandsByProduct();
   }

  async getBrandsByProduct() {
    this.brands = [];
    let data = await this.cacheService.getBrandsWithProduct();
    data.forEach(i => {
      if (i.product.pictures) {
        this.brands.push(i);
      }
    });
  }

  getProducts(name: string) {
    let encodedBrandName = this.httpParameterEncoder.encodeKey(name);
    this.router.navigateByUrl(`/shop/brand/product/${encodedBrandName}`);
  }
}
