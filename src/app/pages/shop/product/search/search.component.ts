import { Component, OnInit, Input, NgModule } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import * as _ from "lodash";
import * as $ from "jquery";
import {
  Product,
  searchResult,
  TagFilter,
} from "../../../../shared/classes/product";
import { ProductsService } from "../../../../shared/services/products.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import { element } from "protractor";
import { CacheService } from "src/app/shared/services/cache.service";
import { UserModel } from "src/app/shared/classes/user";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
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
export class SearchComponent implements OnInit {
  public searchQuery: string;
  public products: Product[] = [];
  public allItems: Product[] = [];
  public isLoading: boolean = true;
  public sortByOrder: string = ""; // sorting
  public animation: any; // Animation
  public user: UserModel;
  public friends: UserModel[];

  lastKey = ""; // key to offset next query from
  finished = false; // boolean when end of data is reached

  constructor(
    private productservice: ProductsService,
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    this.route.params.subscribe((params) => {
      this.searchQuery = this.httpParameterEncoder.decodeValue(params["query"]);
      this.productservice.getSearchResult(this.searchQuery).subscribe(
        (res: searchResult[]) => {
          if (res) {
            res.forEach((element) => {
              if (element.Product.length > 0) {
                this.allItems.push(element.Product[0]);
              }
            });
            this.products = this.allItems.slice(0, 4);
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
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

  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = "fadeIn";
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = "fadeOut";
  }

  // For mobile filter view
  public mobileFilter() {
    $(".collection-filter").css("left", "-15px");
  }

  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == "fadeOut" ? this.fadeIn() : this.fadeOut(); // animation
  }
}
