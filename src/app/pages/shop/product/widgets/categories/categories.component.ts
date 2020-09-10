import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CacheService } from "src/app/shared/services/cache.service";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import * as $ from "jquery";
import { Category } from "src/app/shared/classes/category";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    private router: Router,
    private cacheService: CacheService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    this.getCategory();
  }

  // collapse toggle
  ngOnInit() {
    $(".collapse-block-title").on("click", function (e) {
      e.preventDefault;
      var speed = 300;
      var thisItem = $(this).parent(),
        nextLevel = $(this).next(".collection-collapse-block-content");
      if (thisItem.hasClass("open")) {
        thisItem.removeClass("open");
        nextLevel.slideUp(speed);
      } else {
        thisItem.addClass("open");
        nextLevel.slideDown(speed);
      }
    });
  }

  async getCategory() {
    this.categories = await this.cacheService.getPrimaryCategories();
  }

  navigateProductList(category: string) {
    var encodedCategory = this.httpParameterEncoder.encodeKey(category);
    this.router.navigateByUrl(`/shop/collection/${encodedCategory}`);
  }

  // For mobile view
  public mobileFilterBack() {
    $(".collection-filter").css("left", "-365px");
  }
}
