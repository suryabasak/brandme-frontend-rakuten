import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { trigger, transition, style, animate } from "@angular/animations";
import {
  Product,
  ColorFilter,
  TagFilter,
} from "../../../../../shared/classes/product";
import { ProductsService } from "../../../../../shared/services/products.service";
import { CacheService } from "src/app/shared/services/cache.service";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import * as _ from "lodash";
import * as $ from "jquery";
import { Category } from "src/app/shared/classes/category";
import { Brand } from "src/app/shared/classes/brand";
import { filter } from "rxjs/operators";
import { UserModel } from "src/app/shared/classes/user";

@Component({
  selector: "app-collection-left-sidebar",
  templateUrl: "./collection-left-sidebar.component.html",
  styleUrls: ["./collection-left-sidebar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // angular animation
    trigger("Animation", [
      transition("* => fadeOut", [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 })),
      ]),
      transition("* => fadeIn", [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 })),
      ]),
    ]),
  ],
})
export class CollectionLeftSidebarComponent implements OnInit {
  public products: Product[] = [];
  public allItems: Product[] = [];
  public colorFilters: ColorFilter[] = [];
  public tagsFilters: any[] = [];
  public tags: Brand[] = [];
  public colors: any[] = [];
  public sortByOrder: string = ""; // sorting
  public animation: any; // Animation
  public category: any;
  public isLoading: boolean = true;
  public user: UserModel;
  public friends: UserModel[];

  lastKey = ""; // key to offset next query from
  finished = false; // boolean when end of data is reached

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cacheService: CacheService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    this.route.params.subscribe((params) => {
      this.category = this.httpParameterEncoder.decodeValue(params["category"]);
      this.getBrands(this.category);
      if (this.category == "all") {
        this.productsService
          .getProductByCategory(this.category)
          .subscribe((products) => {
            this.isLoading = false;
            this.allItems = products;
            this.products = products.slice(0, 4);
            this.getColors(products);
          });
      } else {
        this.productsService
          .getProductByCategory1(this.category)
          .subscribe((products) => {
            this.isLoading = false;
            this.allItems = products;
            this.products = products.slice(0, 4);
            this.getColors(products);
          });
      }
    });
  }

  ngOnInit() {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    if (this.user) {
      this.getFriendlist();
    }
  }

  async getFriendlist() {
    this.friends = await this.cacheService.getFriendlist();
  }

  async getBrands(category: string) {
    let categories: Category[] = [];
    let brandNames: string[] = [];

    if (category == "all") {
      categories = await this.cacheService.getPrimaryCategories();
    } else {
      categories = await (
        await this.cacheService.getPrimaryCategories()
      ).filter((i) => {
        return i.category == category;
      });
    }
    categories.forEach((i) => {
      i.brand.forEach((j) => {
        brandNames.push(j);
      });
    });
    brandNames.sort();
    brandNames.forEach((j) => {
      let brandName: Brand = new Brand();

      brandName.brand = j;
      this.tags.push(brandName);
    });
  }

  // Get current product tags
  public getTags(products) {
    var uniqueBrands = [];
    var itemBrand = Array();
    products.map((product, index) => {
      if (product.tags) {
        product.tags.map((tag) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        });
      }
    });
    for (var i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] });
    }
    this.tags = itemBrand;
  }

  // Get current product colors
  public getColors(products) {
    var uniqueColors = [];
    var itemColor = Array();
    products.map((product, index) => {
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        });
      }
    });
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] });
    }
    this.colors = itemColor;
  }

  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = "fadeIn";
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = "fadeOut";
  }

  // Initialize filetr Items
  public filterItems(): Product[] {
    return this.products.filter((item: Product) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => {
        // Match Color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);
      const Tags: boolean = this.tagsFilters.reduce((prev, curr) => {
        // Match Tags
        if (item.brand) {
          if (item.brand == curr) {
            return prev && true;
          }
        }
      }, true);
      return Colors && Tags; // return true
    });
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == "fadeOut" ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update color filter
  public updateColorFilters(colors: ColorFilter[]) {
    this.colorFilters = colors;
    this.animation == "fadeOut" ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update price filter
  public updatePriceFilters(price: any) {
    let items: any[] = [];
    this.allItems.filter((item: Product) => {
      if (item.price >= price[0] && item.price <= price[1]) {
        items.push(item); // push in array
      }
    });
    this.products = items;
  }

  public twoCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-6");
    }
  }

  public threeCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-4");
    }
  }

  public fourCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-3");
    }
  }

  public sixCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-2");
    }
  }

  // For mobile filter view
  public mobileFilter() {
    $(".collection-filter").css("left", "-15px");
  }

  // Infinite scroll
  public onScroll() {
    this.lastKey = _.last(this.allItems)["name"];
    if (this.lastKey != _.last(this.products)["name"]) {
      this.finished = false;
    }
    // If data is identical, stop making queries
    if (this.lastKey == _.last(this.products)["name"]) {
      this.finished = true;
    }
    if (this.products.length < this.allItems.length) {
      let len = this.products.length;
      for (var i = len; i < len + 4; i++) {
        if (this.allItems[i] == undefined) return true;
        this.products.push(this.allItems[i]);
      }
    }
  }

  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == "fadeOut" ? this.fadeIn() : this.fadeOut(); // animation
  }
}
